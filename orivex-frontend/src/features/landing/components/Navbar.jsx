import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Menu,
  X,
} from "lucide-react";


import Button from "@/components/ui/Button";
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(null, "", "");
    }

    setMobileOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-950/55">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}

        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-500 font-extrabold text-white shadow-xl shadow-blue-500/30 transition-all duration-300 group-hover:rotate-6 group-hover:scale-105 sm:h-12 sm:w-12">
            O
          </div>

          <div className="hidden sm:block">
            <h1 className="text-lg font-black tracking-[0.15em] text-white transition-colors duration-300 group-hover:text-blue-300 sm:text-xl">
              ORIVEX
            </h1>

            <p className="text-xs tracking-wide text-slate-500">
              Where Great Ideas Meet Great Talent
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}

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

        {/* Desktop Actions */}

        <div className="hidden items-center gap-4 md:flex">
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

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl border border-slate-800 p-2 text-white transition hover:border-blue-500 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden border-t border-slate-800 bg-slate-950 transition-all duration-300 md:hidden ${
          mobileOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 px-5 py-6">
          <button
            onClick={() => scrollToSection("features")}
            className="block w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            Features
          </button>

          <button
            onClick={() => scrollToSection("how-it-works")}
            className="block w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            How It Works
          </button>

          <button
            onClick={() => scrollToSection("statistics")}
            className="block w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            Statistics
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="block w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            Contact
          </button>

          <div className="pt-4">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
            >
              <Button
                variant="outline"
                className="w-full"
              >
                Login
              </Button>
            </Link>
          </div>

          <div className="pt-3">
            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
            >
              <Button className="w-full">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;