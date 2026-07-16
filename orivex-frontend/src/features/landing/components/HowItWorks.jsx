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
      className="relative overflow-hidden bg-slate-950 py-20 sm:py-24 lg:py-28"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[140px] sm:h-[420px] sm:w-[420px] sm:blur-[180px]" />

        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px] sm:h-[420px] sm:w-[420px] sm:blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-300 sm:px-5 sm:text-sm sm:tracking-[0.3em]">
            HOW IT WORKS
          </span>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:mt-8 sm:text-4xl md:text-5xl">
            Hire Smarter In
            <br />
            Four Simple Steps
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-400 sm:mt-7 sm:text-lg sm:leading-9">
            ORIVEX streamlines hiring with an AI-powered workflow designed for
            businesses, startups and freelancers.
          </p>
        </div>

        {/* Timeline */}

        <div className="relative mt-14 sm:mt-16 lg:mt-24">
          <div className="absolute left-1/2 top-16 hidden h-1 w-[72%] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30 lg:block" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="group relative"
                >
                  <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition-all duration-300 hover:-translate-y-3 hover:border-blue-500/40 hover:shadow-[0_25px_60px_rgba(37,99,235,0.18)] sm:rounded-3xl sm:p-8">
                    {/* Step Number */}

                    <div className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-blue-500/30 bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-xl sm:h-11 sm:w-11 sm:text-base">
                      {index + 1}
                    </div>

                    {/* Icon */}

                    <div className="mt-5 flex justify-center sm:mt-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/80 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/40 sm:h-20 sm:w-20 sm:rounded-3xl">
                        <Icon
                          size={30}
                          className="text-blue-400 transition-transform duration-300 group-hover:rotate-6 sm:h-[34px] sm:w-[34px]"
                        />
                      </div>
                    </div>

                    {/* Title */}

                    <h3 className="mt-6 text-center text-xl font-bold text-white sm:mt-8 sm:text-2xl">
                      {step.title}
                    </h3>

                    {/* Description */}

                    <p className="mt-4 text-center text-sm leading-7 text-slate-400 sm:mt-5 sm:text-base sm:leading-8">
                      {step.description}
                    </p>

                    {/* Learn More */}

                    <div className="mt-6 flex justify-center sm:mt-8">
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

        <div className="mt-14 text-center sm:mt-20">
          <p className="text-base text-slate-400 sm:text-lg">
            From idea to successful delivery — everything happens inside
            ORIVEX.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;