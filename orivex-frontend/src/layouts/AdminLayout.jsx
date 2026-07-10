import { Outlet } from "react-router-dom";

import AdminSidebar from "@/features/admin/components/AdminSidebar";
import AdminHeader from "@/features/admin/components/AdminHeader";

function AdminLayout() {

  return (

    <div className="flex h-screen bg-slate-950">

      <AdminSidebar />

      <div className="flex flex-1 flex-col">

        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-10">

          <Outlet />

        </main>

      </div>

    </div>

  );

}

export default AdminLayout;