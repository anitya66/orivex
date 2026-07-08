import { Bell } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

function Topbar() {
  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
<h1 className="text-lg font-semibold text-white">
  Dashboard
</h1>
      <div className="flex items-center gap-5">

        <button
          onClick={() => navigate("/dashboard/notifications")}
          className="rounded-lg p-2 transition hover:bg-slate-800"
        >
          <Bell
            className="text-slate-400"
            size={22}
          />
        </button>

        <div className="text-right">

          <p className="text-sm font-semibold text-white">
            {user?.name}
          </p>

          <p className="text-xs uppercase tracking-wide text-slate-400">
            {user?.role}
          </p>

        </div>

      </div>

    </header>
  );
}

export default Topbar;