import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import {
  Home,
  PenLine,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Global theme
  const { darkMode, toggleTheme } = useTheme();

  const [mobileMenu, setMobileMenu] = useState(false);

  const token = localStorage.getItem("token");

  // =========================
  // ACTIVE ROUTE
  // =========================
  const isActive = (path) => {
    return location.pathname === path;
  };

  // =========================
  // CLOSE MOBILE MENU
  // =========================
  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMobileMenu(false);

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-xl transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950/90">

      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ===================================================
            LOGO
        ==================================================== */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex items-center gap-2"
        >
          {/* Logo Icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:bg-indigo-700 group-hover:shadow-md">
            <PenLine
              size={18}
              strokeWidth={2.5}
            />
          </div>

          {/* Logo Text */}
          <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
            My<span className="text-indigo-600">Blog</span>
          </span>
        </Link>

        {/* ===================================================
            DESKTOP NAVIGATION
        ==================================================== */}
        <div className="hidden items-center gap-1 md:flex">

          {/* HOME */}
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
              isActive("/")
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            }`}
          >
            <Home size={17} />

            <span>Home</span>
          </Link>

          {token ? (
            <>
              {/* =================================================
                  WRITE
              ================================================== */}
              <Link
                to="/create"
                className="ml-1 flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-[0.97]"
              >
                <PenLine size={17} />

                <span>Write</span>
              </Link>

              {/* =================================================
                  PROFILE
              ================================================== */}
              <Link
                to="/profile"
                className={`ml-1 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive("/profile")
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                }`}
              >
                <User size={17} />

                <span>Profile</span>
              </Link>

              {/* DIVIDER */}
              <div className="mx-2 h-6 w-px bg-gray-200 dark:bg-gray-800" />

              {/* =================================================
                  THEME
              ================================================== */}
              <button
                type="button"
                onClick={toggleTheme}
                title={
                  darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                aria-label={
                  darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                className="group flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {darkMode ? (
                  <Sun
                    size={18}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                ) : (
                  <Moon
                    size={18}
                    className="transition-transform duration-300 group-hover:-rotate-12"
                  />
                )}
              </button>

              {/* =================================================
                  LOGOUT
              ================================================== */}
              <button
                type="button"
                onClick={logout}
                className="ml-1 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
              >
                <LogOut size={17} />

                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* =================================================
                  THEME
              ================================================== */}
              <button
                type="button"
                onClick={toggleTheme}
                title={
                  darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                aria-label={
                  darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                className="ml-2 flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {darkMode ? (
                  <Sun
                    size={18}
                    className="transition-transform duration-300 hover:rotate-45"
                  />
                ) : (
                  <Moon
                    size={18}
                    className="transition-transform duration-300 hover:-rotate-12"
                  />
                )}
              </button>

              {/* =================================================
                  LOGIN
              ================================================== */}
              <Link
                to="/login"
                className="ml-1 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <LogIn size={17} />

                <span>Login</span>
              </Link>

              {/* =================================================
                  REGISTER
              ================================================== */}
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-[0.97]"
              >
                <UserPlus size={17} />

                <span>Register</span>
              </Link>
            </>
          )}
        </div>

        {/* ===================================================
            MOBILE CONTROLS
        ==================================================== */}
        <div className="flex items-center gap-1 md:hidden">

          {/* MOBILE THEME */}
          <button
            type="button"
            onClick={toggleTheme}
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="group flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition-all duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {darkMode ? (
              <Sun
                size={19}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            ) : (
              <Moon
                size={19}
                className="transition-transform duration-300 group-hover:-rotate-12"
              />
            )}
          </button>

          {/* MOBILE MENU */}
          <button
            type="button"
            onClick={() => setMobileMenu((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition-all duration-200 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      {mobileMenu && (
        <div className="border-t border-gray-200 bg-white px-4 pb-5 pt-3 shadow-lg transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950 md:hidden">

          <div className="space-y-1">

            {/* HOME */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive("/")
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              <Home size={18} />

              <span>Home</span>
            </Link>

            {token ? (
              <>
                {/* WRITE */}
                <Link
                  to="/create"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <PenLine size={18} />

                  <span>Write a post</span>
                </Link>

                {/* PROFILE */}
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive("/profile")
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <User size={18} />

                  <span>Profile</span>
                </Link>

                {/* DIVIDER */}
                <div className="my-2 h-px bg-gray-200 dark:bg-gray-800" />

                {/* LOGOUT */}
                <button
                  type="button"
                  onClick={logout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  <LogOut size={18} />

                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* LOGIN */}
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <LogIn size={18} />

                  <span>Login</span>
                </Link>

                {/* REGISTER */}
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <UserPlus size={18} />

                  <span>Create Account</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;