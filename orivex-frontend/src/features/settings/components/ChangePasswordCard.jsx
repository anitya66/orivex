import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { changePassword } from "../services/settingsService";
import { changePasswordSchema } from "../validation/changePasswordSchema";

function ChangePasswordCard() {
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  async function onSubmit(data) {
    try {
      setLoading(true);

      const response = await changePassword(data);

      toast.success(
        response.message ??
          "Password changed successfully."
      );

      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message ??
          "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">

      {/* Header */}

      <div className="border-b border-slate-800 px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-600/15 p-4">

            <ShieldCheck
              size={30}
              className="text-blue-400"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Change Password
            </h2>

            <p className="mt-2 text-slate-400">
              Keep your account secure by using a
              strong password.
            </p>

          </div>

        </div>

      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-7 p-8"
      >
        {/* Current Password */}

        <div>

          <label className="mb-3 block font-medium text-slate-300">
            Current Password
          </label>

          <div className="relative">

            <Input
              type={
                showCurrent
                  ? "text"
                  : "password"
              }
              placeholder="Enter current password"
              {...register("currentPassword")}
              className="pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrent(
                  !showCurrent
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              {showCurrent ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {errors.currentPassword && (
            <p className="mt-2 text-sm text-red-500">
              {
                errors.currentPassword
                  .message
              }
            </p>
          )}

        </div>

        {/* New Password */}

        <div>

          <label className="mb-3 block font-medium text-slate-300">
            New Password
          </label>

          <div className="relative">

            <Input
              type={
                showNew
                  ? "text"
                  : "password"
              }
              placeholder="Enter new password"
              {...register("newPassword")}
              className="pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowNew(!showNew)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              {showNew ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {errors.newPassword && (
            <p className="mt-2 text-sm text-red-500">
              {
                errors.newPassword
                  .message
              }
            </p>
          )}

        </div>

        {/* Security Tips */}

        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">

          <div className="flex items-start gap-4">

            <Lock
              className="mt-1 text-blue-400"
              size={22}
            />

            <div>

              <h3 className="font-semibold text-white">
                Password Tips
              </h3>

              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">

                <li>
                  • Use at least 8 characters.
                </li>

                <li>
                  • Include uppercase and lowercase letters.
                </li>

                <li>
                  • Include numbers and special characters.
                </li>

                <li>
                  • Don't reuse old passwords.
                </li>

              </ul>

            </div>

          </div>

        </div>

        {/* Button */}

        <div className="flex justify-end">

          <Button
            type="submit"
            disabled={loading}
            size="lg"
          >
            {loading
              ? "Updating Password..."
              : "Update Password"}
          </Button>

        </div>

      </form>

    </div>
  );
}

export default ChangePasswordCard;