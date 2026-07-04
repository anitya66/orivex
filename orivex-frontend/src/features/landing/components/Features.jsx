import {
  MessageCircle,
  ShieldCheck,
  Briefcase,
  Bell,
  Star,
  Zap,
} from "lucide-react";

import FeatureCard from "@/components/common/FeatureCard";

const features = [
  {
    icon: MessageCircle,
    title: "Real-Time Chat",
    description:
      "Communicate instantly with clients and freelancers.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Contracts",
    description:
      "Every project is backed by secure agreements.",
  },
  {
    icon: Briefcase,
    title: "Smart Hiring",
    description:
      "Find the right freelancer faster with better matching.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Never miss project updates or messages.",
  },
  {
    icon: Star,
    title: "Reviews",
    description:
      "Transparent ratings build trust for everyone.",
  },
  {
    icon: Zap,
    title: "Fast Workflow",
    description:
      "Manage projects efficiently from one dashboard.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-slate-950 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <h2 className="text-4xl font-bold text-white">
            Why Choose ORIVEX
          </h2>

          <p className="mt-4 text-slate-400">
            Everything you need to hire, collaborate,
            and deliver projects successfully.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;