"use client";

import { useEffect, useState } from "react";

import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function DashboardPage() {
  const [providers, setProviders] = useState<any[]>([]);

  async function fetchDashboard() {
    const res = await fetch("/api/dashboard");

    const data = await res.json();

    setProviders(data.data);
  }

  useEffect(() => {
    fetchDashboard();

    socket.on("new-lead-created", () => {
      fetchDashboard();
    });

    return () => {
      socket.off("new-lead-created");
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Provider Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Real-time provider lead distribution overview.
            </p>
          </div>

          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            Live Updates Active
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {providers.map((provider) => {

            const quotaPercentage =
              (provider.usedQuota /
                provider.monthlyQuota) *
              100;

            return (
              <div
                key={provider.providerId}
                className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition"
              >

                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {provider.providerName}
                  </h2>

                  <span className="text-sm bg-black text-white px-3 py-1 rounded-full">
                    {provider.leadsReceived} Leads
                  </span>
                </div>

                <div className="mt-6">

                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">
                      Quota Usage
                    </span>

                    <span className="font-medium">
                      {provider.usedQuota}/
                      {provider.monthlyQuota}
                    </span>
                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-black rounded-full transition-all"
                      style={{
                        width: `${quotaPercentage}%`,
                      }}
                    />
                  </div>

                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-gray-500">
                      Remaining Quota
                    </span>

                    <span className="font-semibold text-gray-900">
                      {provider.remainingQuota}
                    </span>
                  </div>
                </div>

                <div className="mt-8">

                  <h3 className="font-semibold text-lg mb-4">
                    Assigned Leads
                  </h3>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">

                    {provider.assignedLeads.length === 0 && (
                      <div className="text-sm text-gray-500 border rounded-xl p-4">
                        No leads assigned yet.
                      </div>
                    )}

                    {provider.assignedLeads.map(
                      (assignment: any) => (

                        <div
                          key={assignment._id}
                          className="border rounded-xl p-4 bg-gray-50"
                        >

                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-gray-900">
                              {
                                assignment.leadId
                                  ?.name
                              }
                            </p>

                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              {
                                assignment.leadId
                                  ?.serviceType
                              }
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 mt-2">
                            {
                              assignment.leadId
                                ?.phone
                            }
                          </p>

                          <p className="text-sm text-gray-500">
                            {
                              assignment.leadId
                                ?.city
                            }
                          </p>

                          {assignment.leadId
                            ?.description && (
                            <p className="text-sm mt-3 text-gray-700">
                              {
                                assignment.leadId
                                  ?.description
                              }
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}