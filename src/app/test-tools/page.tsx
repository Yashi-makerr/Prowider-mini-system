"use client";

import { useState } from "react";



export default function TestToolsPage() {

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");



  async function resetQuota() {

    try {

      setLoading(true);

      setMessage("");



      const res = await fetch(
        "/api/webhook/reset-quota",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            eventId:
              "payment_success_001",
          }),
        }
      );



      const data =
        await res.json();



      setMessage(data.message);

    } catch (error) {

      setMessage(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  }



  async function callDuplicateWebhook() {

    try {

      setLoading(true);

      setMessage("");



      const requests = [];



      for (let i = 0; i < 3; i++) {

        requests.push(

          fetch(
            "/api/webhook/reset-quota",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                eventId:
                  "duplicate_payment_001",
              }),
            }
          )
        );
      }



      const responses =
        await Promise.all(
          requests
        );



      const results =
        await Promise.all(
          responses.map((r) =>
            r.json()
          )
        );



      console.log(results);

      setMessage(
        "Duplicate webhook test completed. Check console."
      );

    } catch (error) {

      setMessage(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  }



  async function generateLeads() {

    try {

      setLoading(true);

      setMessage("");



      const requests = [];



      for (let i = 0; i < 10; i++) {

        requests.push(

          fetch("/api/leads", {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              name:
                `Concurrent User ${i}`,

              phone:
                `88${Date.now()}${i}`,

              city: "Delhi",

              serviceType:
                "Service 1",

              description:
                "Concurrency stress test",
            }),
          })
        );
      }



      await Promise.all(
        requests
      );



      setMessage(
        "10 concurrent leads generated successfully."
      );

    } catch (error) {

      setMessage(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  }



  return (

    <main className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="max-w-4xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-900">

            Test Tools Panel

          </h1>



          <p className="text-gray-600 mt-2">

            Simulate webhook events,
            concurrency stress tests,
            and provider quota resets.

          </p>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* RESET QUOTA */}

          <div className="bg-white rounded-2xl border shadow-sm p-6">

            <h2 className="text-2xl font-semibold">

              Reset Provider Quota

            </h2>



            <p className="text-gray-600 mt-3">

              Simulates successful
              payment webhook and
              resets all provider quotas.
            </p>



            <button
              onClick={resetQuota}

              disabled={loading}

              className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
            >

              Reset Quotas

            </button>
          </div>



          {/* DUPLICATE WEBHOOK */}

          <div className="bg-white rounded-2xl border shadow-sm p-6">

            <h2 className="text-2xl font-semibold">

              Duplicate Webhook Test

            </h2>



            <p className="text-gray-600 mt-3">

              Calls same webhook
              multiple times to verify
              idempotency handling.
            </p>



            <button
              onClick={
                callDuplicateWebhook
              }

              disabled={loading}

              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:opacity-90 transition"
            >

              Test Idempotency

            </button>
          </div>



          {/* CONCURRENCY */}

          <div className="bg-white rounded-2xl border shadow-sm p-6 md:col-span-2">

            <h2 className="text-2xl font-semibold">

              Concurrency Stress Test

            </h2>



            <p className="text-gray-600 mt-3">

              Generates 10 simultaneous
              lead requests to verify
              transaction safety,
              quota handling, and fair
              round-robin allocation.
            </p>



            <button
              onClick={generateLeads}

              disabled={loading}

              className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
            >

              Generate 10 Leads Instantly

            </button>
          </div>
        </div>



        {/* STATUS MESSAGE */}

        {message && (

          <div className="mt-8 bg-white border rounded-2xl p-5 shadow-sm">

            <p className="font-medium text-gray-800">

              {message}

            </p>
          </div>
        )}
      </div>
    </main>
  );
}