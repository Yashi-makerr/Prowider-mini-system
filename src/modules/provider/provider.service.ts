import "@/models/Lead";
import Provider from "@/models/Provider";
import LeadAssignment from "@/models/LeadAssignment";



export async function getDashboardData() {

  // FETCH ALL PROVIDERS
  const providers = await Provider.find()
    .sort({ name: 1 });



  const dashboardData = [];



  for (const provider of providers) {

    // FETCH ASSIGNMENTS
    const assignments =
      await LeadAssignment.find({
        providerId: provider._id,
      })
        .populate("leadId")
        .sort({ createdAt: -1 });



    dashboardData.push({

      providerId: provider._id,

      providerName: provider.name,

      monthlyQuota:
        provider.monthlyQuota,

      usedQuota:
        provider.usedQuota,

      remainingQuota:
        provider.monthlyQuota -
        provider.usedQuota,

      leadsReceived:
        assignments.length,

      assignedLeads:
        assignments,
    });
  }



  return dashboardData;
}