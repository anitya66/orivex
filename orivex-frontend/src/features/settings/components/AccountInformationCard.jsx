import { Mail, Shield, User } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

function AccountInformationCard() {
  const { user } = useAuth();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-white">
        Account Information
      </h2>

      <p className="mt-2 text-slate-400">
        Basic information about your account.
      </p>

      <div className="mt-8 space-y-6">

        <div className="flex items-center gap-4">
          <User className="text-blue-500" />

          <div>
            <p className="text-sm text-slate-400">
              Name
            </p>

            <p className="font-medium text-white">
              {user?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Mail className="text-blue-500" />

          <div>
            <p className="text-sm text-slate-400">
              Email
            </p>

            <p className="font-medium text-white">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Shield className="text-blue-500" />

          <div>
            <p className="text-sm text-slate-400">
              Role
            </p>

            <p className="font-medium text-white">
              {user?.role}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AccountInformationCard;