function TrustedCompanies() {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Spotify",
    "Netflix",
    "Adobe",
  ];

  return (
    <section className="border-y border-slate-800 bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <p className="mb-10 text-center text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
          Trusted by innovative teams worldwide
        </p>

        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-3 lg:grid-cols-6">

          {companies.map((company) => (
            <div
              key={company}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 text-lg font-semibold text-slate-300 transition-all duration-300 hover:border-blue-500 hover:text-white"
            >
              {company}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TrustedCompanies;