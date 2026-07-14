import {
  FilePlus2,
  Brain,
  Handshake,
  Rocket,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: FilePlus2,
    title: "Post Your Project",
    description:
      "Create your project with budget, timeline and required skills in just a few minutes.",
  },
  {
    icon: Brain,
    title: "AI Matches Talent",
    description:
      "Our recommendation engine analyzes skills, experience, ratings and availability to rank freelancers.",
  },
  {
    icon: Handshake,
    title: "Hire & Collaborate",
    description:
      "Review proposals, sign secure contracts and communicate in real-time through built-in chat.",
  },
  {
    icon: Rocket,
    title: "Deliver & Grow",
    description:
      "Complete milestones, release secure payments and build long-term professional relationships.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-slate-950 py-28"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[180px]" />

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[180px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">

            HOW IT WORKS

          </span>

          <h2 className="mt-8 text-4xl font-black tracking-tight text-white md:text-5xl">

            Hire Smarter In
            <br />
            Four Simple Steps

          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-slate-400">

            ORIVEX streamlines hiring with an AI-powered workflow
            designed for businesses, startups and freelancers.

          </p>

        </div>

        {/* Timeline */}

        <div className="relative mt-24">

          <div className="absolute left-1/2 top-16 hidden h-1 w-[72%] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30 lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">

            {steps.map((step, index) => {

              const Icon = step.icon;

              return (

                <div
                  key={step.title}
                  className="group relative"
                >

                  <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-all duration-300 hover:-translate-y-3 hover:border-blue-500/40 hover:shadow-[0_25px_60px_rgba(37,99,235,0.18)]">

                    {/* Step Number */}

                    <div className="absolute -top-5 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-blue-500/30 bg-gradient-to-br from-blue-600 to-cyan-500 font-bold text-white shadow-xl">

                      {index + 1}

                    </div>

                    {/* Icon */}

                    <div className="mt-6 flex justify-center">

                      <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-700 bg-slate-800/80 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/40">

                        <Icon
                          size={34}
                          className="text-blue-400 transition-transform duration-300 group-hover:rotate-6"
                        />

                      </div>

                    </div>

                    {/* Title */}

                    <h3 className="mt-8 text-center text-2xl font-bold text-white">

                      {step.title}

                    </h3>

                    {/* Description */}

                    <p className="mt-5 text-center leading-8 text-slate-400">

                      {step.description}

                    </p>

                    {/* Learn More */}

                    <div className="mt-8 flex justify-center">

                      <span className="flex items-center text-sm font-semibold text-blue-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">

                        Learn More

                        <ArrowRight className="ml-2 h-4 w-4" />

                      </span>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-20 text-center">

          <p className="text-lg text-slate-400">

            From idea to successful delivery — everything happens inside ORIVEX.

          </p>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;