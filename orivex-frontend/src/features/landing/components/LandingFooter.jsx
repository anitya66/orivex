import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

function LandingFooter() {
  return (
    <footer
      id="contact"
      className="border-t border-slate-800 bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Top */}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-14">
          {/* Brand */}

          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 text-xl font-black text-white shadow-lg sm:h-14 sm:w-14 sm:text-2xl">
                O
              </div>

              <div>
                <h2 className="text-2xl font-black text-white sm:text-3xl">
                  ORIVEX
                </h2>

                <p className="text-xs text-slate-400 sm:text-sm">
                  Premium Freelance Marketplace
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              ORIVEX is an AI-powered freelance marketplace that helps
              businesses hire talented freelancers, collaborate securely
              and deliver projects faster.
            </p>
          </div>

          {/* Product */}

          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Product
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <a
                href="#features"
                className="block text-sm text-slate-400 transition hover:text-blue-400 sm:text-base"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="block text-sm text-slate-400 transition hover:text-blue-400 sm:text-base"
              >
                How It Works
              </a>

              <a
                href="#statistics"
                className="block text-sm text-slate-400 transition hover:text-blue-400 sm:text-base"
              >
                Statistics
              </a>
            </div>
          </div>

          {/* Company */}

          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Company
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <Link
                to="/register"
                className="block text-sm text-slate-400 transition hover:text-blue-400 sm:text-base"
              >
                Join ORIVEX
              </Link>

              <Link
                to="/login"
                className="block text-sm text-slate-400 transition hover:text-blue-400 sm:text-base"
              >
                Login
              </Link>

              <a
                href="#contact"
                className="block text-sm text-slate-400 transition hover:text-blue-400 sm:text-base"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Resources */}

          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Resources
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <Link
                to="/privacy-policy"
                className="block text-sm text-slate-400 transition hover:text-blue-400 sm:text-base"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="block text-sm text-slate-400 transition hover:text-blue-400 sm:text-base"
              >
                Terms of Service
              </Link>

              <Link
                to="/help-center"
                className="block text-sm text-slate-400 transition hover:text-blue-400 sm:text-base"
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-800 pt-8 md:mt-16 md:flex-row">
          <p className="text-center text-xs text-slate-500 sm:text-sm md:text-left">
            © {new Date().getFullYear()} ORIVEX. All rights reserved.
          </p>

          <div className="flex items-center gap-4 sm:gap-5">
            <a
              href="https://github.com/anitya66"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-800 p-2 text-slate-400 transition hover:border-blue-500 hover:text-white"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://linkedin.com/anitya-anand-602011299"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-800 p-2 text-slate-400 transition hover:border-blue-500 hover:text-white"
            >
              <FaLinkedin size={20} />
            </a>

            <a
              href="https://twitter.com/anityaanand11"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-800 p-2 text-slate-400 transition hover:border-blue-500 hover:text-white"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;