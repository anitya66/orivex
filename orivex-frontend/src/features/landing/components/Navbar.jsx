import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Button from "@/components/ui/Button";

function Navbar() {

  const scrollToSection = (id) => {

    const element = document.getElementById(id);

    if (element) {

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(null, "", " ");

    }

  };

  return (

   <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-950/55">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}

        <Link
    to="/"
    className="group flex items-center gap-3"
        >
          

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-500 font-extrabold text-white shadow-xl shadow-blue-500/30 transition-all duration-300 group-hover:rotate-6 group-hover:scale-105">

            O

          </div>

          <div>

            <h1 className="text-xl font-black tracking-[0.15em] text-white transition-colors duration-300 group-hover:text-blue-300">

              ORIVEX

            </h1>

            <p className="text-xs tracking-wide text-slate-500">

              Where Great Ideas Meet Great Talent

            </p>

          </div>

        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-9 xl:flex">

          <button
            onClick={() => scrollToSection("features")}
            className="relative font-medium text-slate-400 transition-all duration-300 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Features
          </button>

          <button
            onClick={() => scrollToSection("how-it-works")}
            className="font-medium text-slate-400 transition hover:text-white"
          >
            How It Works
          </button>

          <button
            onClick={() => scrollToSection("statistics")}
            className="font-medium text-slate-400 transition hover:text-white"
          >
            Statistics
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="font-medium text-slate-400 transition hover:text-white"
          >
            Contact
          </button>

        </nav>

        {/* Actions */}

        <div className="flex items-center gap-4">

          <Link to="/login">

            <Button variant="outline">

              Login

            </Button>

          </Link>

          <Link to="/register">

            <Button>

              Get Started

              <ArrowRight className="ml-2 h-4 w-4" />

            </Button>

          </Link>

        </div>

      </div>

    </header>

  );

}

export default Navbar;