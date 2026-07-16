const stats = [
  {
    value: "500+",
    label: "Projects Posted",
  },
  {
    value: "1K+",
    label: "Freelancers",
  },
  {
    value: "99%",
    label: "Success Rate",
  },
];

function HeroStats() {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-8 text-center sm:justify-start sm:text-left lg:gap-12">

      {stats.map((item) => (

        <div key={item.label}>

          <h2 className="text-4xl font-black text-white sm:text-5xl">

            {item.value}

          </h2>

          <p className="mt-2 text-sm text-slate-400 sm:text-base">

            {item.label}

          </p>

        </div>

      ))}

    </div>
  );
}

export default HeroStats;