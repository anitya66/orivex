import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import Sidebar from "@/components/common/Sidebar/Sidebar";
import Topbar from "@/components/common/Topbar/Topbar";

import {
  connectSocket,
  disconnectSocket,
} from "@/features/chat/websocket/socketManager";

function DashboardLayout() {

  useEffect(() => {

    console.log("DashboardLayout Mounted");

    connectSocket();

    return () => {

        console.log("DashboardLayout Unmounted");

        disconnectSocket();

    };

}, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">

      {/* Sidebar */}

      <div className="sticky top-0 h-screen flex-shrink-0">
        <Sidebar />
      </div>

      {/* Right Section */}

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Topbar */}

        <Topbar />

        {/* Page Content */}

        <main className="flex-1 overflow-y-auto bg-slate-950">

          <div className="mx-auto w-full max-w-7xl px-8 py-8">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;