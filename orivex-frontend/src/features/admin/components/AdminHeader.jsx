import { useAuth } from "@/contexts/AuthContext";

function AdminHeader() {

  const { user } = useAuth();

  return (

    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-10 py-6">

      <h1 className="text-2xl font-bold text-white">

        Admin Dashboard

      </h1>

      <div className="text-right">

        <p className="font-semibold text-white">

          {user?.name}

        </p>

        <p className="text-sm text-slate-400">

          ADMIN

        </p>

      </div>

    </header>

  );

}

export default AdminHeader;