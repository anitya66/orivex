import {
  Bell,
  Shield,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

function AdminHeader() {

  const { user } = useAuth();

  return (

    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-10 py-6">

      <div>

        <h1 className="text-3xl font-bold text-white">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome back. Here's what's happening today.
        </p>

      </div>

      <div className="flex items-center gap-6">

        <button className="relative rounded-xl bg-slate-900 p-3 transition hover:bg-slate-800">

          <Bell
            size={20}
            className="text-slate-300"
          />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />

        </button>

        <div className="flex items-center gap-4 rounded-2xl bg-slate-900 px-5 py-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">

            <Shield
              size={20}
              className="text-white"
            />

          </div>

          <div>

            <p className="font-semibold text-white">
              {user?.name}
            </p>

            <p className="text-sm text-slate-400">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>

  );

}

export default AdminHeader;