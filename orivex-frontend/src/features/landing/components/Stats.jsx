import { motion } from "framer-motion";

const stats = [
  {
    number: "50K+",
    label: "Freelancers",
  },
  {
    number: "12K+",
    label: "Clients",
  },
  {
    number: "250K+",
    label: "Projects Completed",
  },
  {
    number: "99.9%",
    label: "Client Satisfaction",
  },
];

function Stats() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <h2 className="text-4xl font-bold text-white">
            Trusted by Thousands
          </h2>

          <p className="mt-4 text-slate-400">
            Numbers that reflect our growing freelance community.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center"
            >
              <h3 className="text-5xl font-black text-blue-500">
                {stat.number}
              </h3>

              <p className="mt-4 text-slate-400">
                {stat.label}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;