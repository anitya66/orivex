import {
  UserPlus,
  BriefcaseBusiness,
  MessageSquare,
  CircleDollarSign,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description:
      "Register as a Client or Freelancer in just a few clicks.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Post or Find Projects",
    description:
      "Clients post jobs while freelancers discover opportunities.",
  },
  {
    icon: MessageSquare,
    title: "Collaborate",
    description:
      "Chat in real time, submit work, and manage contracts.",
  },
  {
    icon: CircleDollarSign,
    title: "Complete & Get Paid",
    description:
      "Finish the project securely and receive payments with confidence.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-slate-900 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <h2 className="text-4xl font-bold text-white">
            How ORIVEX Works
          </h2>

          <p className="mt-4 text-slate-400">
            A simple workflow from hiring to successful project delivery.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-blue-500"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">

                  <Icon className="h-8 w-8 text-blue-500" />

                </div>

                <div className="mb-4 text-sm font-bold text-blue-400">
                  STEP {index + 1}
                </div>

                <h3 className="mb-3 text-xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="text-slate-400">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;