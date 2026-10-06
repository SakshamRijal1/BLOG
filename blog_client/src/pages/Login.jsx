import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  PenLine,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { api } from "../api";
import { useTheme } from "../context/ThemeContext";

function Login() {
  const navigate = useNavigate();

  // =========================
  // GLOBAL THEME
  // =========================

  const { darkMode } = useTheme();

  // =========================
  // FORM
  // =========================

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // LOGIN
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await api.login(form);

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/");
    } catch (error) {
      setError(
        error.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================

  const handleGoogleLogin = () => {
    try {
      setGoogleLoading(true);

      window.location.href =
        "http://localhost:5000/api/auth/google";
    } catch (error) {
      setGoogleLoading(false);

      setError(
        "Google login could not be started."
      );
    }
  };

  return (
    <main
      className={`min-h-[calc(100vh-64px)] transition-colors duration-300 ${
        darkMode
          ? "bg-gray-950"
          : "bg-[#f8fafc]"
      }`}
    >
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div
          className={`grid w-full overflow-hidden rounded-3xl border shadow-2xl transition-colors duration-300 lg:grid-cols-2 ${
            darkMode
              ? "border-gray-800 bg-gray-900 shadow-black/30"
              : "border-gray-200 bg-white shadow-gray-200/60"
          }`}
        >
          {/* =========================
              LEFT SIDE
          ========================= */}

          <div className="relative hidden overflow-hidden bg-gray-950 p-12 lg:flex lg:flex-col lg:justify-between">
            {/* Background decoration */}

            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />

            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="relative">
              {/* Logo */}

              <Link
                to="/"
                className="inline-flex items-center gap-2"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-900/30">
                  <PenLine size={20} />
                </div>

                <span className="text-xl font-black text-white">
                  SakshamRijal
                </span>
              </Link>

              {/* Main text */}

              <div className="mt-28">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300">
                  <Sparkles size={15} />
                  Welcome back
                </div>

                <h2 className="max-w-lg text-5xl font-black leading-tight tracking-tight text-white">
                  Your ideas are
                  <span className="block text-indigo-400">
                    worth sharing.
                  </span>
                </h2>

                <p className="mt-6 max-w-md text-lg leading-8 text-gray-400">
                  Sign in to continue writing,
                  sharing and discovering ideas
                  from the community.
                </p>
              </div>
            </div>

            {/* Bottom */}

            <div className="relative flex items-center gap-3 text-sm text-gray-500">
              <div className="h-2 w-2 rounded-full bg-green-400" />

              Your ideas. Your stories. Your voice.
            </div>
          </div>

          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div
            className={`flex items-center justify-center p-6 transition-colors duration-300 sm:p-10 lg:p-12 ${
              darkMode
                ? "bg-gray-900"
                : "bg-white"
            }`}
          >
            <div className="w-full max-w-md">
              {/* Mobile logo */}

              <div className="mb-8 flex justify-center lg:hidden">
                <Link
                  to="/"
                  className="flex items-center gap-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                    <PenLine size={20} />
                  </div>

                  <span
                    className={`text-xl font-black ${
                      darkMode
                        ? "text-white"
                        : "text-gray-950"
                    }`}
                  >
                    SakshamRijal
                  </span>
                </Link>
              </div>

              {/* Heading */}

              <div className="mb-8">
                <h1
                  className={`text-3xl font-black tracking-tight sm:text-4xl ${
                    darkMode
                      ? "text-white"
                      : "text-gray-950"
                  }`}
                >
                  Welcome back
                </h1>

                <p
                  className={`mt-2 ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Login to continue your journey.
                </p>
              </div>

              {/* Error */}

              {error && (
                <div
                  className={`mb-5 rounded-xl border p-4 ${
                    darkMode
                      ? "border-red-900/60 bg-red-950/40"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      darkMode
                        ? "text-red-400"
                        : "text-red-700"
                    }`}
                  >
                    {error}
                  </p>
                </div>
              )}

              {/* =========================
                  GOOGLE
              ========================= */}

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={
                  googleLoading || loading
                }
                className={`flex w-full items-center justify-center gap-3 rounded-xl border py-3.5 font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  darkMode
                    ? "border-gray-700 bg-gray-950 text-gray-200 hover:border-gray-600 hover:bg-gray-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {googleLoading ? (
                  <span
                    className={`h-5 w-5 animate-spin rounded-full border-2 ${
                      darkMode
                        ? "border-gray-700 border-t-gray-200"
                        : "border-gray-300 border-t-gray-800"
                    }`}
                  />
                ) : (
                  <GoogleIcon />
                )}

                {googleLoading
                  ? "Connecting..."
                  : "Continue with Google"}
              </button>

              {/* Divider */}

              <div className="my-7 flex items-center gap-4">
                <div
                  className={`h-px flex-1 ${
                    darkMode
                      ? "bg-gray-800"
                      : "bg-gray-200"
                  }`}
                />

                <span
                  className={`text-xs font-medium uppercase tracking-wider ${
                    darkMode
                      ? "text-gray-600"
                      : "text-gray-400"
                  }`}
                >
                  Or continue with email
                </span>

                <div
                  className={`h-px flex-1 ${
                    darkMode
                      ? "bg-gray-800"
                      : "bg-gray-200"
                  }`}
                />
              </div>

              {/* =========================
                  FORM
              ========================= */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Email */}

                <div>
                  <label
                    className={`mb-2 block text-sm font-semibold ${
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-700"
                    }`}
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                        darkMode
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    />

                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm outline-none transition ${
                        darkMode
                          ? "border-gray-800 bg-gray-950 text-gray-100 placeholder:text-gray-600 focus:border-indigo-500 focus:bg-gray-950 focus:ring-4 focus:ring-indigo-950/50"
                          : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                      }`}
                    />
                  </div>
                </div>

                {/* Password */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      className={`block text-sm font-semibold ${
                        darkMode
                          ? "text-gray-300"
                          : "text-gray-700"
                      }`}
                    >
                      Password
                    </label>
                  </div>

                  <div className="relative">
                    <Lock
                      size={18}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                        darkMode
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      className={`w-full rounded-xl border py-3.5 pl-11 pr-12 text-sm outline-none transition ${
                        darkMode
                          ? "border-gray-800 bg-gray-950 text-gray-100 placeholder:text-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50"
                          : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 transition ${
                        darkMode
                          ? "text-gray-500 hover:bg-gray-800 hover:text-gray-200"
                          : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                      }`}
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Login button */}

                <button
                  type="submit"
                  disabled={
                    loading || googleLoading
                  }
                  className={`group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-bold text-white shadow-lg transition hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 ${
                    darkMode
                      ? "shadow-indigo-950/40"
                      : "shadow-indigo-200"
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />

                      Login

                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Register */}

              <p
                className={`mt-7 text-center text-sm ${
                  darkMode
                    ? "text-gray-500"
                    : "text-gray-500"
                }`}
              >
                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-bold text-indigo-500 transition hover:text-indigo-400 hover:underline"
                >
                  Create one
                </Link>
              </p>

              {/* Footer */}

              <p
                className={`mt-8 text-center text-xs leading-5 ${
                  darkMode
                    ? "text-gray-600"
                    : "text-gray-400"
                }`}
              >
                By continuing, you agree to use the
                platform responsibly and respect
                the community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================
   GOOGLE ICON
========================= */

function GoogleIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.805 12.23c0-.79-.07-1.55-.225-2.28H12v4.31h5.495a4.7 4.7 0 0 1-2.04 3.085v2.565h3.3c1.93-1.775 3.05-4.39 3.05-7.68Z"
        fill="#4285F4"
      />

      <path
        d="M12 22c2.76 0 5.075-.915 6.765-2.48l-3.3-2.565c-.915.615-2.085.98-3.465.98-2.665 0-4.925-1.8-5.735-4.22H2.855v2.645A10.22 10.22 0 0 0 12 22Z"
        fill="#34A853"
      />

      <path
        d="M6.265 13.715A6.14 6.14 0 0 1 5.945 12c0-.595.11-1.175.32-1.715V7.64H2.855A10 10 0 0 0 2 12c0 1.61.385 3.13 1.065 4.36l3.2-2.645Z"
        fill="#FBBC05"
      />

      <path
        d="M12 6.065c1.5 0 2.845.515 3.905 1.525l2.93-2.93C17.07 3.045 14.755 2 12 2a10.22 10.22 0 0 0-9.145 5.64l3.41 2.645C7.075 7.865 9.335 6.065 12 6.065Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default Login;