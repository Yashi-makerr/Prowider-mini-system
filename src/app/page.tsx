import Link from "next/link";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-6 py-20">

        <div className="text-center">

          <h1 className="text-5xl font-bold text-gray-900">

            Prowider Mini Lead
            Distribution System

          </h1>



          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">

            Real-time lead allocation
            platform with fair provider
            distribution, concurrency-safe
            assignment, and live dashboard
            updates.

          </p>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

          <Link
            href="/request-service"
            className="bg-white rounded-2xl shadow-sm border p-8 hover:shadow-md transition"
          >

            <h2 className="text-2xl font-semibold">

              Request Service

            </h2>

            <p className="mt-3 text-gray-600">

              Submit a new customer
              service enquiry.

            </p>
          </Link>



          <Link
            href="/dashboard"
            className="bg-white rounded-2xl shadow-sm border p-8 hover:shadow-md transition"
          >

            <h2 className="text-2xl font-semibold">

              Provider Dashboard

            </h2>

            <p className="mt-3 text-gray-600">

              View providers, quotas,
              and assigned leads.

            </p>
          </Link>



          <Link
            href="/test-tools"
            className="bg-white rounded-2xl shadow-sm border p-8 hover:shadow-md transition"
          >

            <h2 className="text-2xl font-semibold">

              Test Tools

            </h2>

            <p className="mt-3 text-gray-600">

              Simulate webhooks and
              concurrency testing.

            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}