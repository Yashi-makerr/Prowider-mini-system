import mongoose from "mongoose";

import Provider from "@/models/Provider";
import LeadAssignment from "@/models/LeadAssignment";

import {
  TOTAL_ASSIGNMENTS,
  MANDATORY_PROVIDERS,
} from "@/lib/constants";

import { getNextRoundRobinProviders }
from "./roundRobin.service";



export async function allocateLead(
  lead: any
) {

  const session =
    await mongoose.startSession();



  session.startTransaction();



  try {

    const assignedProviders = [];



    // STEP 1
    // MANDATORY PROVIDERS

    const mandatoryProviderNames =
      MANDATORY_PROVIDERS[
        lead.serviceType as keyof typeof
        MANDATORY_PROVIDERS
      ];



    const mandatoryProviders =
      await Provider.find({

        name: {
          $in: mandatoryProviderNames,
        },

        isActive: true,

        $expr: {
          $lt: [
            "$usedQuota",
            "$monthlyQuota",
          ],
        },

      }).session(session);



    for (const provider of mandatoryProviders) {

      assignedProviders.push(provider);



      provider.usedQuota += 1;

      await provider.save({
        session,
      });
    }



    // STEP 2
    // ROUND ROBIN PROVIDERS

    const remainingSlots =
      TOTAL_ASSIGNMENTS -
      assignedProviders.length;



    if (remainingSlots > 0) {

      const rrProviders =
        await getNextRoundRobinProviders(

          lead.serviceType,

          assignedProviders.map((p) =>
            p._id.toString()
          ),

          remainingSlots,

          session
        );



      for (const provider of rrProviders) {

        assignedProviders.push(provider);



        provider.usedQuota += 1;

        await provider.save({
          session,
        });
      }
    }



    // FINAL SAFETY CHECK
    if (
      assignedProviders.length !==
      TOTAL_ASSIGNMENTS
    ) {

      throw new Error(
        "Unable to allocate exactly 3 providers"
      );
    }



    // STEP 3
    // CREATE ASSIGNMENTS

    const assignments =
      assignedProviders.map(
        (provider) => ({
          leadId: lead._id,
          providerId: provider._id,
          serviceType: lead.serviceType,
        })
      );



    await LeadAssignment.insertMany(
      assignments,
      { session }
    );



    await session.commitTransaction();

    return assignedProviders;

  } catch (error) {

    await session.abortTransaction();

    throw error;

  } finally {

    session.endSession();
  }
}