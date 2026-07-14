import companies from "../constants/companies";

function TrustedCompanies() {
  return (
    <section
      id="companies"
      className="relative overflow-hidden border-y border-slate-800 bg-slate-950 py-28"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-blue-600/10 blur-[160px]" />

        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[180px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">

            TRUSTED WORLDWIDE

          </span>

          <h2 className="mt-8 text-4xl font-black tracking-tight text-white md:text-5xl">

            Trusted by Innovative Teams

          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-slate-400">

            Thousands of startups, agencies and enterprises trust
            ORIVEX to discover exceptional freelancers,
            collaborate securely and deliver world-class
            digital products faster.

          </p>

        </div>

        {/* Company Grid */}

        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">

          {companies.map((company) => (

            <div
              key={company}
              className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)]"
            >

              {/* Glow */}

              <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />

              </div>

              {/* Company */}

              <div className="relative flex h-full items-center justify-center">

                <span className="text-xl font-bold tracking-wide text-slate-500 transition-all duration-300 group-hover:scale-105 group-hover:text-white">

                  {company}

                </span>

              </div>

            </div>

          ))}

        </div>

        {/* Bottom Text */}

        <div className="mt-16 text-center">

          <p className="text-sm tracking-wide text-slate-500">

            Join <span className="font-semibold text-blue-400">10,000+</span> professionals already building with ORIVEX.

          </p>

        </div>

      </div>

    </section>
  );
}

export default TrustedCompanies;