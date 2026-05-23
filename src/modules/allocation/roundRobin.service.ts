import AllocationState from "@/models/AllocationState";
import Provider from "@/models/Provider";



export async function getNextRoundRobinProviders(
  serviceType: string,
  excludedProviderIds: string[],
  requiredCount: number,
  session: any
) {

  const providerPools: Record<string, string[]> = {

    "Service 1": [
      "Provider 2",
      "Provider 3",
      "Provider 4",
    ],

    "Service 2": [
      "Provider 6",
      "Provider 7",
      "Provider 8",
    ],

    "Service 3": [
      "Provider 2",
      "Provider 3",
      "Provider 5",
      "Provider 6",
      "Provider 7",
      "Provider 8",
    ],
  };



  const pool = providerPools[serviceType];



  // FETCH RR STATE
  const allocationState =
    await AllocationState.findOne({
      serviceType,
    }).session(session);



  if (!allocationState) {
    throw new Error(
      "Allocation state missing"
    );
  }



  // FETCH ELIGIBLE PROVIDERS
  const providers = await Provider.find({
    name: { $in: pool },

    isActive: true,

    $expr: {
      $lt: ["$usedQuota", "$monthlyQuota"],
    },
  }).session(session);



  const filteredProviders = providers.filter(
    (provider) =>
      !excludedProviderIds.includes(
        provider._id.toString()
      )
  );



  if (filteredProviders.length === 0) {
    return [];
  }
  const selectedProviders: any[] = [];

  let currentIndex =
    allocationState.lastAssignedIndex;

  let checked = 0;

  while (
    selectedProviders.length < requiredCount &&
    checked < filteredProviders.length
  ) {

    currentIndex =
      (currentIndex + 1) %
      filteredProviders.length;



    const provider =
      filteredProviders[currentIndex];



    if (
      !selectedProviders.find(
        (p) =>
          p._id.toString() ===
          provider._id.toString()
      )
    ) {

      selectedProviders.push(provider);
    }



    checked++;
  }



  // UPDATE RR STATE
  allocationState.lastAssignedIndex =
    currentIndex;

  await allocationState.save({
    session,
  });



  return selectedProviders;
}