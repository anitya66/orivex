import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
          🚀 Premium Freelance Marketplace
        </span>

        <h1 className="mt-8 max-w-5xl text-5xl font-black leading-tight text-white md:text-7xl">
          Hire Better.
          <br />
          Build Faster.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
          Connect with skilled freelancers, manage projects,
          communicate in real time, and deliver work with confidence —
          all in one modern platform.
        </p>

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
      </div>
    </section>
  );
}

export default Hero;