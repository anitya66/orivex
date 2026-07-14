import {
  Bell,
  Search,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

function Topbar() {
  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-8 backdrop-blur">

      {/* Left */}

      <div>

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <span>Workspace</span>

          <ChevronRight size={14} />

          <span className="text-slate-300">
            Dashboard
          </span>

        </div>

        <h1 className="mt-1 text-3xl font-bold text-white">

          Welcome back,

          <span className="ml-2 text-blue-500">
            {user?.name?.split(" ")[0]}
          </span>

          👋

        </h1>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="hidden lg:flex">

          <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3">

            <Search
              size={18}
              className="text-slate-500"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-56 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />

          </div>

        </div>

        {/* Notification */}

        <button
          onClick={() =>
            navigate("/dashboard/notifications")
          }
          className="relative rounded-2xl border border-slate-800 bg-slate-900 p-3 transition-all duration-200 hover:border-blue-500 hover:bg-slate-800"
        >

          <Bell
            size={20}
            className="text-slate-300"
          />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white">

            {user?.name?.charAt(0)?.toUpperCase()}

          </div>

          <div>

            <p className="font-semibold text-white">
              {user?.name}
            </p>

            <p className="text-xs uppercase tracking-wider text-slate-400">
              {user?.role}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;