import {
  Brain,
  ShieldCheck,
  MessageSquare,
  BellRing,
  BadgeCheck,
  Layers3,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Talent Matching",
    description:
      "Our intelligent recommendation engine finds the most suitable freelancer based on skills, experience, ratings and availability.",
    color: "text-blue-400",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Chat",
    description:
      "Collaborate instantly with clients and freelancers using live messaging, typing indicators and notifications.",
    color: "text-cyan-400",
  },
  {
    icon: ShieldCheck,
    title: "Secure Contracts",
    description:
      "Protect every project using milestone based contracts, escrow workflow and secure agreements.",
    color: "text-emerald-400",
  },
  {
    icon: BellRing,
    title: "Instant Notifications",
    description:
      "Receive live updates for proposals, payments, reviews, contracts and every important activity.",
    color: "text-yellow-400",
  },
  {
    icon: BadgeCheck,
    title: "Verified Professionals",
    description:
      "Hire trusted freelancers with verified profiles, ratings, portfolios and completed project history.",
    color: "text-violet-400",
  },
  {
    icon: Layers3,
    title: "Role Based Dashboard",
    description:
      "Separate dashboards for Clients, Freelancers and Administrators with personalized workflows.",
    color: "text-pink-400",
  },
];

function WhyChoose() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-slate-950 py-28"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[180px]" />

        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[180px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">

            WHY CHOOSE ORIVEX

          </span>

          <h2 className="mt-8 text-4xl font-black tracking-tight text-white md:text-5xl">

            Everything You Need
            <br />
            In One Platform

          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-slate-400">

            ORIVEX combines AI, secure contracts, payments,
            real-time communication and project management into one
            modern freelance ecosystem built for professionals.

          </p>

        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (

              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-all duration-300 hover:-translate-y-3 hover:border-blue-500/40 hover:shadow-[0_25px_60px_rgba(37,99,235,0.18)]"
              >

                {/* Glow */}

                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">

                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />

                </div>

                <div className="relative">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/80 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/40">

                    <Icon
                      size={30}
                      className={`${feature.color} transition-transform duration-300 group-hover:rotate-6`}
                    />

                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-white">

                    {feature.title}

                  </h3>

                  <p className="mt-5 leading-8 text-slate-400">

                    {feature.description}

                  </p>

                  <div className="mt-8 flex items-center text-sm font-semibold text-blue-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">

                    Learn More

                    <ArrowRight className="ml-2 h-4 w-4" />

                  </div>

                </div>

              </div>

            );

          })}

        </div>

        {/* Bottom */}

        <div className="mt-20 text-center">

          <p className="text-lg text-slate-400">

            Trusted by startups, agencies and enterprises worldwide.

          </p>

          <p className="mt-2 text-sm text-slate-500">

            Build faster. Hire smarter. Scale confidently.

          </p>

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;