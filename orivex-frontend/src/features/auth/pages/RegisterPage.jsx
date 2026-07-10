import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { register as registerUser } from "../services/authService";
import { registerSchema } from "../validation/registerSchema";

import { ROUTES } from "@/constants/routes";

function RegisterPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CLIENT",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await registerUser(data);

      toast.success(
        response.message || "Registration Successful"
      );

      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 text-slate-400">
          Join ORIVEX and start hiring or freelancing today.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          {/* Name */}
          <div>
            <Input
              type="text"
              placeholder="Full Name"
              {...register("name")}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Input
              type="email"
              placeholder="Email Address"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Register As
            </label>

            <select
              {...register("role")}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            >
              <option value="CLIENT">
                Client
              </option>

              <option value="FREELANCER">
                Freelancer
              </option>
            </select>

            {errors.role && (
              <p className="mt-1 text-sm text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
      );
}

export default RegisterPage;