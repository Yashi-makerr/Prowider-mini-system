"use client";

import { useState } from "react";



export default function RequestServicePage() {

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      city: "",
      serviceType: "Service 1",
      description: "",
    });



  const [loading, setLoading] =
    useState(false);



  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);



    try {

      const res = await fetch(
        "/api/leads",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData
          ),
        }
      );



      const data =
        await res.json();



      alert(data.message);

      if (data.success) {

        setFormData({
          name: "",
          phone: "",
          city: "",
          serviceType:
            "Service 1",
          description: "",
        });
      }

    } catch (error) {

      alert(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
}

  return (

    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border p-8">

        <h1 className="text-3xl font-bold text-gray-900">

          Request Service

        </h1>

        <p className="text-gray-600 mt-2">

          Submit a customer enquiry
          for automatic provider
          allocation.

        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >

          <div>

            <label className="block text-sm font-medium mb-2">

              Name

            </label>

            <input
              type="text"

              required

              value={formData.name}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }

              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>

            <label className="block text-sm font-medium mb-2">

              Phone Number

            </label>

            <input
              type="text"

              required

              value={formData.phone}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone:
                    e.target.value,
                })
              }

              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>

            <label className="block text-sm font-medium mb-2">

              City

            </label>

            <input
              type="text"

              required

              value={formData.city}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }

              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>

            <label className="block text-sm font-medium mb-2">

              Service Type

            </label>

            <select
              value={
                formData.serviceType
              }

              onChange={(e) =>
                setFormData({
                  ...formData,
                  serviceType:
                    e.target.value,
                })
              }

              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            >

              <option>
                Service 1
              </option>

              <option>
                Service 2
              </option>

              <option>
                Service 3
              </option>

            </select>
          </div>

          <div>

            <label className="block text-sm font-medium mb-2">

              Description

            </label>

            <textarea
              rows={4}

              value={
                formData.description
              }

              onChange={(e) =>
                setFormData({
                  ...formData,
                  description:
                    e.target.value,
                })
              }

              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"

            disabled={loading}

            className="w-full bg-black text-white rounded-xl py-3 font-medium hover:opacity-90 transition"
          >

            {loading
              ? "Submitting..."
              : "Submit Request"}

          </button>
        </form>
      </div>
    </main>
  );
}