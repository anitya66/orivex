import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <h1 className="border-b border-slate-800 p-5 text-xl font-bold">
        ORIVEX Dashboard
      </h1>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;