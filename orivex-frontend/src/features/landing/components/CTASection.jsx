import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";


import { ROUTES } from "@/constants/routes";

function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-24 lg:py-32">
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[140px] sm:h-[450px] sm:w-[450px] sm:blur-[180px]" />

        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px] sm:h-[450px] sm:w-[450px] sm:blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-6 py-14 text-center shadow-[0_35px_90px_rgba(37,99,235,0.18)] sm:rounded-[36px] sm:px-8 sm:py-20 lg:rounded-[40px] lg:px-10 lg:py-24">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-600/10 blur-[140px] sm:h-80 sm:w-80 sm:blur-[160px]" />

          <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-[140px] sm:h-80 sm:w-80 sm:blur-[160px]" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300 sm:px-5 sm:text-sm">
              <Sparkles className="h-4 w-4" />

              Join ORIVEX Today
            </span>

            <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-black tracking-tight text-white sm:mt-8 sm:text-5xl lg:text-6xl">
              Build Your Next

              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Success Story
              </span>

              With ORIVEX
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-400 sm:mt-8 sm:text-lg sm:leading-9">
              Whether you're hiring exceptional freelancers or searching for
              your next opportunity, ORIVEX provides everything you need to
              collaborate, build and grow.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:mt-12 sm:flex-row sm:gap-5">
              <Button
                size="lg"
                onClick={() => navigate(ROUTES.REGISTER)}
                className="w-full sm:w-auto"
              >
                Get Started

                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
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