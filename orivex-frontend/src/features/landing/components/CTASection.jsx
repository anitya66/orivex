import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-slate-950 py-32">

      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[180px]" />

        <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[180px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-[40px] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-10 py-24 text-center shadow-[0_35px_90px_rgba(37,99,235,0.18)]">

          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-600/10 blur-[160px]" />

          <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-[160px]" />

          <div className="relative">

            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-300">

              <Sparkles className="h-4 w-4" />

              Join ORIVEX Today

            </span>

            <h2 className="mx-auto mt-8 max-w-4xl text-5xl font-black tracking-tight text-white md:text-6xl">

              Build Your Next

              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">

                Success Story

              </span>

              With ORIVEX

            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-400">

              Whether you're hiring exceptional freelancers or searching
              for your next opportunity, ORIVEX provides everything you
              need to collaborate, build and grow.

            </p>

            <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">

              <Button
                size="lg"
                onClick={() => navigate(ROUTES.REGISTER)}
              >
                Get Started

                <ArrowRight className="ml-2 h-5 w-5" />

              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                Sign In
              </Button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTASection;