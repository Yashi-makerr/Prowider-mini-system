import Lead from "@/models/Lead";

import { allocateLead }
from "../allocation/allocation.service";

export async function createLead(
  data: any
) {

  // CREATE LEAD
  const lead = await Lead.create(data);
  // ALLOCATE
  await allocateLead(lead);

  // EMIT REALTIME EVENT
  if (global.io) {

    global.io.emit(
      "new-lead-created",
      {
        message:
          "New lead assigned",
      }
    );
  }
  return lead;
}