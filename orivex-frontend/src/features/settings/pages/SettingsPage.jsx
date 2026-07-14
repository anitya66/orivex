import { Settings } from "lucide-react";

import AccountInformationCard from "../components/AccountInformationCard";
import ChangePasswordCard from "../components/ChangePasswordCard";

function SettingsPage() {
  return (
    <div className="space-y-10">

      {/* Hero */}

      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-600/20 via-slate-900 to-slate-900 p-8">

        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative flex items-center gap-6">

          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600/20">

            <Settings
              size={42}
              className="text-blue-400"
            />

          </div>

          <div>

            <h1 className="text-4xl font-bold text-white">

              Settings

            </h1>

            <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-400">

              Manage your account information,
              update your password and keep your
              ORIVEX account secure.

            </p>

          </div>

        </div>

      </div>

      <AccountInformationCard />

      <ChangePasswordCard />

    </div>
  );
}

export default SettingsPage;