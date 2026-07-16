import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

import DashboardPreview from "./DashboardPreview";
import HeroStats from "./HeroStats";

function Hero() {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShieldCheck,
      color: "text-emerald-400",
      text: "Secure Contracts",
    },
    {
      icon: MessageCircle,
      color: "text-cyan-400",
      text: "Real-Time Chat",
    },
    {
      icon: BriefcaseBusiness,
      color: "text-violet-400",
      text: "AI Talent Matching",
    },
    {
      icon: CheckCircle2,
      color: "text-emerald-400",
      text: "Verified Professionals",
    },
  ];

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-slate-950">

      {/* Background Blur Effects */}

      <div className="absolute inset-0">

        <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-indigo-600/10 blur-[180px]" />

        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[160px]" />

      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:gap-16 lg:px-8 lg:py-24 lg:grid-cols-2 lg:items-center">

        {/* LEFT */}

        <div>

          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-5 py-2 text-sm font-semibold text-blue-300 backdrop-blur-md">

            <Sparkles className="h-4 w-4 fill-current" />

            AI Powered Freelance Marketplace

          </span>

          <h1 className="mt-8 max-w-[700px] text-4xl font-black leading-tight tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">

            Hire Smarter.

            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">

              Build Faster.

            </span>

            Deliver Better.

          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg lg:text-xl lg:leading-9">

            ORIVEX connects businesses with highly skilled freelancers,
            helping companies hire faster, collaborate seamlessly,
            manage contracts securely and deliver exceptional digital products.

          </p>

          {/* CTA */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Button
              size="lg"
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Hire Talent

              <ArrowRight className="ml-2 h-5 w-5" />

            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Become a Freelancer
            </Button>

          </div>

          {/* Features */}

          <div className="mt-12 grid gap-4 sm:grid-cols-2">

            {features.map((feature) => {

              const Icon = feature.icon;

              return (

                <div
                  key={feature.text}
                  className="group flex items-center gap-3 rounded-2xl border border-transparent bg-transparent px-3 py-3 sm:px-4 sm:py-4"
                >

                  <Icon
                    className={`h-5 w-5 ${feature.color} transition-transform duration-300 group-hover:scale-110`}
                  />

                  <span className="text-slate-300">

                    {feature.text}

                  </span>

                </div>

              );

            })}

          </div>

          {/* Hero Stats */}

          <div className="mt-12">

            <HeroStats />

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative mx-auto w-full max-w-xl transition-transform duration-500 md:max-w-2xl lg:max-w-none lg:scale-105">

          <DashboardPreview />

        </div>

      </div>

    </section>
  );
}

export default Hero;