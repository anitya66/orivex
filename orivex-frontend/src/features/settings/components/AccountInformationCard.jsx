import {
  Mail,
  Shield,
  User,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

function AccountInformationCard() {
  const { user } = useAuth();

  const roleColor = {
    CLIENT: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    FREELANCER:
      "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    ADMIN:
      "bg-purple-500/15 text-purple-400 border-purple-500/30",
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">

      {/* Header */}

      <div className="border-b border-slate-800 px-8 py-6">

        <h2 className="text-2xl font-bold text-white">
          Account Information
        </h2>

        <p className="mt-2 text-slate-400">
          View your account details and current role.
        </p>

      </div>

      {/* Content */}

      <div className="grid gap-6 p-8 md:grid-cols-2">

        <InfoCard
          icon={User}
          label="Full Name"
          value={user?.name || "-"}
          color="text-blue-400"
        />

        <InfoCard
          icon={Mail}
          label="Email Address"
          value={user?.email || "-"}
          color="text-cyan-400"
        />

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-slate-800 p-3">

              <Shield
                size={22}
                className="text-emerald-400"
              />

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Account Role
              </p>

              <div
                className={`mt-3 inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${
                  roleColor[user?.role] ??
                  "border-slate-700 bg-slate-800 text-white"
                }`}
              >
                <BadgeCheck
                  size={16}
                  className="mr-2"
                />

                {user?.role}

              </div>

            </div>

          </div>

        </div>

        <InfoCard
          icon={CalendarDays}
          label="Account Status"
          value="Active"
          color="text-yellow-400"
        />

      </div>

    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  color,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-blue-500/30">

      <div className="flex items-center gap-4">

        <div className="rounded-xl bg-slate-800 p-3">

          <Icon
            size={22}
            className={color}
          />

        </div>

        <div>

          <p className="text-sm text-slate-500">
            {label}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-white break-all">
            {value}
          </h3>

        </div>

      </div>

    </div>
  );
}

export default AccountInformationCard;