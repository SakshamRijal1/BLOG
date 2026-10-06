import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,

  Globe,
} from "lucide-react";

import { api } from "../api";
import { useTheme } from "../context/ThemeContext";

function Register() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
    const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     REGISTER
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await api.register(form);

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/");
    } catch (error) {
      setError(
        error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     GOOGLE SIGNUP
  ========================= */

  const handleGoogleSignup = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  };

  return (
    <main
      className="
        min-h-[calc(100vh-64px)]
        bg-gradient-to-br
        from-indigo-50
        via-white
        to-purple-50
        px-4
        py-10
        transition-colors
        duration-300
        dark:from-gray-950
        dark:via-gray-950
        dark:to-indigo-950/30
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-[calc(100vh-144px)]
          max-w-6xl
          items-center
          justify-center
        "
      >
        {/* =========================
            MAIN CARD
        ========================= */}

        <div
          className="
            grid
            w-full
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-xl
            transition-colors
            duration-300
            dark:border-gray-800
            dark:bg-gray-900
            dark:shadow-black/30
            lg:grid-cols-2
          "
        >
          {/* =========================
              LEFT SIDE
          ========================= */}

          <div
            className="
              hidden
              flex-col
              justify-between
              bg-gradient-to-br
              from-indigo-600
              via-indigo-700
              to-purple-700
              p-10
              text-white
              dark:from-indigo-700
              dark:via-indigo-800
              dark:to-purple-900
              lg:flex
              xl:p-14
            "
          >
            <div>
              {/* Icon */}

              <div
                className="
                  mb-8
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/15
                  backdrop-blur
                "
              >
                <UserPlus size={24} />
              </div>

              {/* Heading */}

              <h2
                className="
                  max-w-md
                  text-4xl
                  font-black
                  leading-tight
                "
              >
                Join the community and share your ideas.
              </h2>

              {/* Description */}

              <p
                className="
                  mt-5
                  max-w-md
                  text-base
                  leading-7
                  text-indigo-100
                "
              >
                Create your account and start sharing
                posts, connecting with people, and
                discovering new ideas.
              </p>
            </div>

            {/* Features */}

            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-white" />

                <span className="text-sm text-indigo-100">
                  Share your thoughts
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-white" />

                <span className="text-sm text-indigo-100">
                  Connect with others
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-white" />

                <span className="text-sm text-indigo-100">
                  Build your profile
                </span>
              </div>
            </div>
          </div>

          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div
            className="
              p-6
              transition-colors
              duration-300
              dark:bg-gray-900
              sm:p-10
              lg:p-12
            "
          >
            {/* Header */}

            <div className="mb-8">
              {/* Mobile Icon */}

              <div
                className="
                  mb-5
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-100
                  text-indigo-600
                  dark:bg-indigo-500/10
                  dark:text-indigo-400
                  lg:hidden
                "
              >
                <UserPlus size={22} />
              </div>

              <h1
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  text-gray-900
                  transition-colors
                  dark:text-white
                "
              >
                Create your account
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Start sharing your ideas today.
              </p>
            </div>

            {/* Error */}

            {error && (
              <div
                className="
                  mb-5
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-red-600
                  dark:border-red-900/50
                  dark:bg-red-950/40
                  dark:text-red-400
                "
              >
                {error}
              </div>
            )}

            {/* =========================
                GOOGLE SIGNUP
            ========================= */}

            <button
              type="button"
              onClick={handleGoogleSignup}
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

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />

              <span
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-wider
                  text-gray-400
                  dark:text-gray-500
                "
              >
                or continue with email
              </span>

              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
            </div>

            {/* =========================
                FORM
            ========================= */}

            <form onSubmit={handleSubmit}>
              {/* NAME */}

              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  Full name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      dark:text-gray-500
                    "
                  />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-gray-50
                      py-3
                      pl-11
                      pr-4
                      text-sm
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-indigo-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-indigo-100
                      dark:border-gray-700
                      dark:bg-gray-800
                      dark:text-white
                      dark:placeholder:text-gray-500
                      dark:focus:border-indigo-500
                      dark:focus:bg-gray-800
                      dark:focus:ring-indigo-500/10
                    "
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      dark:text-gray-500
                    "
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-gray-50
                      py-3
                      pl-11
                      pr-4
                      text-sm
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-indigo-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-indigo-100
                      dark:border-gray-700
                      dark:bg-gray-800
                      dark:text-white
                      dark:placeholder:text-gray-500
                      dark:focus:border-indigo-500
                      dark:focus:bg-gray-800
                      dark:focus:ring-indigo-500/10
                    "
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      dark:text-gray-500
                    "
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Minimum 6 characters"
                    value={form.password}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-gray-50
                      py-3
                      pl-11
                      pr-12
                      text-sm
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-indigo-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-indigo-100
                      dark:border-gray-700
                      dark:bg-gray-800
                      dark:text-white
                      dark:placeholder:text-gray-500
                      dark:focus:border-indigo-500
                      dark:focus:bg-gray-800
                      dark:focus:ring-indigo-500/10
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="
                      absolute
                      right-3.5
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      transition
                      hover:text-gray-600
                      dark:text-gray-500
                      dark:hover:text-gray-300
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <p
                  className="
                    mt-2
                    text-xs
                    text-gray-400
                    dark:text-gray-500
                  "
                >
                  Use at least 6 characters.
                </p>
              </div>

              {/* CREATE ACCOUNT */}

              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-indigo-600
                  py-3.5
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-indigo-700
                  hover:shadow-md
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <UserPlus size={18} />

                {loading
                  ? "Creating account..."
                  : "Create Account"}
              </button>
            </form>

            {/* LOGIN */}

            <p
              className="
                mt-7
                text-center
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              Already have an account?{" "}

              <Link
                to="/login"
                className="
                  font-bold
                  text-indigo-600
                  transition
                  hover:text-indigo-700
                  hover:underline
                  dark:text-indigo-400
                  dark:hover:text-indigo-300
                "
              >
                Login
              </Link>
            </p>

            {/* TERMS */}

            <p
              className="
                mt-5
                text-center
                text-xs
                leading-5
                text-gray-400
                dark:text-gray-500
              "
            >
              By creating an account, you agree to our
              terms and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;

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