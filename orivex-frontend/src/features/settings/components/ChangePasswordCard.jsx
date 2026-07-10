import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { changePassword } from "../services/settingsService";
import { changePasswordSchema } from "../validation/changePasswordSchema";

function ChangePasswordCard() {
  const [loading, setLoading] = useState(false);

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
        response.message ||
          "Password changed successfully."
      );

      reset();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-white">
        Change Password
      </h2>

      <p className="mt-2 text-slate-400">
        Keep your account secure by updating your password regularly.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
      >
        <div>
          <Input
            type="password"
            placeholder="Current Password"
            {...register("currentPassword")}
          />

          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="New Password"
            {...register("newPassword")}
          />

          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Updating..."
            : "Update Password"}
        </Button>
      </form>
    </div>
  );
}

export default ChangePasswordCard;