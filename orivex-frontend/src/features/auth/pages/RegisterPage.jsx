import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-5 py-10 sm:px-6">
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[160px]" />

        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[160px]" />
      </div>

      {/* Card */}

      <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-[0_30px_90px_rgba(37,99,235,0.18)] backdrop-blur-xl sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl font-black text-white shadow-lg">
            O
          </div>

          <h1 className="mt-6 text-3xl font-black text-white">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Join ORIVEX and start hiring or freelancing today.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Name */}

          <div>
            <Input
              type="text"
              placeholder="Full Name"
              {...register("name")}
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">
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
              <p className="mt-2 text-sm text-red-500">
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
              <p className="mt-2 text-sm text-red-500">
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
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="CLIENT">
                Client
              </option>

              <option value="FREELANCER">
                Freelancer
              </option>
            </select>

            {errors.role && (
              <p className="mt-2 text-sm text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              "Creating Account..."
            ) : (
              <>
                Create Account

                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;