import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "@/components/ui/Button";

function CTA() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-5xl px-6">

        <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800 p-12 text-center">

          <h2 className="text-5xl font-bold text-white">
            Ready to build something amazing?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Join thousands of clients and freelancers already growing
            their careers with ORIVEX.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Link to="/register">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link to="/login">
              <Button
                variant="outline"
                size="lg"
              >
                Sign In
              </Button>
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}

export default CTA;