import AccountInformationCard from "../components/AccountInformationCard";
import ChangePasswordCard from "../components/ChangePasswordCard";

function SettingsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your account and security.
        </p>
      </div>

      <AccountInformationCard />

      <ChangePasswordCard />

    </div>
  );
}

export default SettingsPage;