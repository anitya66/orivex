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
      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-14 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 text-2xl font-black text-white shadow-lg">

                O

              </div>

              <div>

                <h2 className="text-3xl font-black text-white">

                  ORIVEX

                </h2>

                <p className="text-sm text-slate-400">

                  Premium Freelance Marketplace

                </p>

              </div>

            </div>

            <p className="mt-6 max-w-sm leading-8 text-slate-400">

              ORIVEX is an AI-powered freelance marketplace that helps
              businesses hire talented freelancers, collaborate securely
              and deliver projects faster.

            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="mb-6 text-lg font-bold text-white">

              Product

            </h3>

            <div className="space-y-4">

              <a
                href="#features"
                className="block text-slate-400 transition hover:text-blue-400"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="block text-slate-400 transition hover:text-blue-400"
              >
                How It Works
              </a>

              <a
                href="#statistics"
                className="block text-slate-400 transition hover:text-blue-400"
              >
                Statistics
              </a>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-6 text-lg font-bold text-white">

              Company

            </h3>

            <div className="space-y-4">

              <Link
                to="/register"
                className="block text-slate-400 transition hover:text-blue-400"
              >
                Join ORIVEX
              </Link>

              <Link
                to="/login"
                className="block text-slate-400 transition hover:text-blue-400"
              >
                Login
              </Link>

              <a
                href="#contact"
                className="block text-slate-400 transition hover:text-blue-400"
              >
                Contact
              </a>

            </div>

          </div>

          {/* Resources */}

          <div>

            <h3 className="mb-6 text-lg font-bold text-white">

              Resources

            </h3>

            <div className="space-y-4">

              <Link
                to="/privacy-policy"
                className="block text-slate-400 transition hover:text-blue-400"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="block text-slate-400 transition hover:text-blue-400"
              >
                Terms of Service
              </Link>

              <Link
                to="/help-center"
                className="block text-slate-400 transition hover:text-blue-400"
              >
                Help Center
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-800 pt-8 md:flex-row">

          <p className="text-sm text-slate-500">

            © {new Date().getFullYear()} ORIVEX. All rights reserved.

          </p>

          <div className="flex items-center gap-5">

  <a
    href="https://github.com/"
    target="_blank"
    rel="noreferrer"
    className="rounded-xl border border-slate-800 p-2 text-slate-400 transition hover:border-blue-500 hover:text-white"
  >
    <FaGithub size={20} />
  </a>

  <a
    href="https://linkedin.com/"
    target="_blank"
    rel="noreferrer"
    className="rounded-xl border border-slate-800 p-2 text-slate-400 transition hover:border-blue-500 hover:text-white"
  >
    <FaLinkedin size={20} />
  </a>

  <a
    href="https://twitter.com/"
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