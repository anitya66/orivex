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
    <div className="mt-16 flex flex-wrap gap-12">

      {stats.map((item) => (

        <div key={item.label}>

          <h2 className="text-5xl font-black text-white">

            {item.value}

          </h2>

          <p className="mt-2 text-slate-400">

            {item.label}

          </p>

        </div>

      ))}

    </div>
  );
}

export default HeroStats;