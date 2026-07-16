import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import {
  login,
  getCurrentUser,
} from "../services/authService";

import { STORAGE_KEYS } from "@/constants/storageKeys";
import { loginSchema } from "../validation/loginSchema";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/constants/routes";

function LoginPage() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Login API
      const response = await login(data);

      // Save JWT
      localStorage.setItem(
        STORAGE_KEYS.ACCESS_TOKEN,
        response.data.accessToken
      );

      // Fetch Current User
      const currentUser = await getCurrentUser();

      // Save User
      setUser(currentUser.data);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Login Failed"
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

            Welcome Back

          </h1>

          <p className="mt-2 text-sm text-slate-400 sm:text-base">

            Sign in to continue your ORIVEX journey.

          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
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

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              "Signing In..."
            ) : (
              <>
                Sign In

                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

        </form>

        <p className="mt-8 text-center text-sm text-slate-400">

          Don't have an account?{" "}

          <Link
            to={ROUTES.REGISTER}
            className="font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Create Account
          </Link>

        </p>

      </div>
    </div>
  );
}

export default LoginPage;