import Provider from "@/models/Provider";
import AllocationState from "@/models/AllocationState";
import {
  SERVICES,
  MONTHLY_QUOTA,
} from "./constants";

export async function seedDatabase() {
  try {

    // CHECK IF PROVIDERS ALREADY EXIST
    const existingProviders =
      await Provider.countDocuments();

    if (existingProviders === 0) {

      const providers = [];

      for (let i = 1; i <= 8; i++) {
        providers.push({
          name: `Provider ${i}`,
          monthlyQuota: MONTHLY_QUOTA,
          usedQuota: 0,
        });
      }

      await Provider.insertMany(providers);

      console.log("Providers seeded");
    }



    // CHECK RR STATES
    const existingStates =
      await AllocationState.countDocuments();

    if (existingStates === 0) {

      const states = SERVICES.map(
        (service) => ({
          serviceType: service,
          lastAssignedIndex: -1,
        })
      );

      await AllocationState.insertMany(states);

      console.log("Allocation states seeded");
    }

  } catch (error) {
    console.log("Seed error", error);
  }
}