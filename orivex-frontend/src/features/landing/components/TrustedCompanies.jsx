import companies from "../constants/companies";

function TrustedCompanies() {
  return (
    <section
      id="companies"
      className="relative overflow-hidden border-y border-slate-800 bg-slate-950 py-20 sm:py-24 lg:py-28"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-10 h-60 w-60 rounded-full bg-blue-600/10 blur-[140px] sm:h-72 sm:w-72 sm:blur-[160px]" />

        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-[150px] sm:h-80 sm:w-80 sm:blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-300 sm:px-5 sm:text-sm sm:tracking-[0.28em]">
            TRUSTED WORLDWIDE
          </span>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:mt-8 sm:text-4xl md:text-5xl">
            Trusted by Innovative Teams
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-400 sm:mt-7 sm:text-lg sm:leading-9">
            Thousands of startups, agencies and enterprises trust ORIVEX to
            discover exceptional freelancers, collaborate securely and deliver
            world-class digital products faster.
          </p>
        </div>

        {/* Company Grid */}

        <div className="mt-14 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-5 md:grid-cols-3 lg:mt-20 lg:grid-cols-6 lg:gap-6">
          {companies.map((company) => (
            <div
              key={company}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)] sm:rounded-3xl sm:p-6 lg:p-8"
            >
              {/* Glow */}

              <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
              </div>

              {/* Company */}

              <div className="relative flex min-h-[56px] items-center justify-center sm:min-h-[72px]">
                <span className="text-base font-bold tracking-wide text-slate-500 transition-all duration-300 group-hover:scale-105 group-hover:text-white sm:text-lg lg:text-xl">
                  {company}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}

        <div className="mt-12 text-center sm:mt-16">
          <p className="text-xs tracking-wide text-slate-500 sm:text-sm">
            Join{" "}
            <span className="font-semibold text-blue-400">
              10,000+
            </span>{" "}
            professionals already building with ORIVEX.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TrustedCompanies;