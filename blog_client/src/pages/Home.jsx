import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  PenLine,
  BookOpen,
  Sparkles,
  TrendingUp,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import { api } from "../api";
import PostCard from "../components/PostCard";
import { useTheme } from "../context/ThemeContext";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // GLOBAL THEME
  // =====================================================

  const { darkMode } = useTheme();

  // =====================================================
  // LOAD POSTS
  // =====================================================

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api.getPosts();

      setPosts(data);
    } catch (error) {
      setError(
        error.message || "Unable to load articles."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-950 text-gray-100"
          : "bg-[#f8fafc] text-gray-900"
      }`}
    >
      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className={`relative overflow-hidden border-b transition-colors duration-300 ${
          darkMode
            ? "border-gray-800 bg-gray-950"
            : "border-gray-200 bg-white"
        }`}
      >
        {/* Background decoration */}

        <div
          className={`pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full blur-3xl ${
            darkMode
              ? "bg-indigo-600/15"
              : "bg-indigo-100/60"
          }`}
        />

        <div
          className={`pointer-events-none absolute -bottom-40 left-0 h-80 w-80 rounded-full blur-3xl ${
            darkMode
              ? "bg-purple-600/10"
              : "bg-purple-100/50"
          }`}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            {/* =================================================
                HERO TEXT
            ================================================= */}

            <div>
              {/* Badge */}

              <div
                className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                  darkMode
                    ? "border-indigo-500/20 bg-indigo-500/10 text-indigo-300"
                    : "border-indigo-100 bg-indigo-50 text-indigo-700"
                }`}
              >
                <Sparkles size={15} />

                A place for ideas
              </div>

              {/* Heading */}

              <h1
                className={`max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl ${
                  darkMode
                    ? "text-white"
                    : "text-gray-950"
                }`}
              >
                Ideas become
                <span className="block text-indigo-500">
                  stories.
                </span>
              </h1>

              {/* Description */}

              <p
                className={`mt-7 max-w-2xl text-lg leading-8 sm:text-xl ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                Share your knowledge, experiences
                and ideas with a community of
                curious readers. Write something
                meaningful and let your story reach
                the world.
              </p>

              {/* Buttons */}

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/create"
                  className={`group flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl ${
                    darkMode
                      ? "shadow-lg shadow-indigo-950/50"
                      : "shadow-lg shadow-indigo-200"
                  }`}
                >
                  Start writing

                  <ArrowRight
                    size={19}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="#posts"
                  className={`flex items-center gap-2 rounded-xl border px-6 py-3.5 font-bold transition ${
                    darkMode
                      ? "border-gray-800 bg-gray-900 text-gray-200 hover:border-gray-700 hover:bg-gray-800"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <BookOpen size={18} />

                  Explore articles
                </a>
              </div>

              {/* Stats */}

              <div
                className={`mt-10 flex flex-wrap items-center gap-8 border-t pt-7 ${
                  darkMode
                    ? "border-gray-800"
                    : "border-gray-100"
                }`}
              >
                <div>
                  <p
                    className={`text-2xl font-bold ${
                      darkMode
                        ? "text-white"
                        : "text-gray-950"
                    }`}
                  >
                    {posts.length}
                  </p>

                  <p className="text-sm text-gray-500">
                    Articles
                  </p>
                </div>

                <div
                  className={`h-8 w-px ${
                    darkMode
                      ? "bg-gray-800"
                      : "bg-gray-200"
                  }`}
                />

                <div>
                  <p
                    className={`flex items-center gap-1.5 text-2xl font-bold ${
                      darkMode
                        ? "text-white"
                        : "text-gray-950"
                    }`}
                  >
                    <TrendingUp
                      size={20}
                      className="text-indigo-500"
                    />

                    Growing
                  </p>

                  <p className="text-sm text-gray-500">
                    Community
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                HERO VISUAL
            ================================================= */}

            <div className="relative hidden lg:block">
              <div
                className={`relative rotate-2 rounded-3xl border p-3 shadow-2xl transition-colors ${
                  darkMode
                    ? "border-gray-800 bg-gray-900 shadow-black/40"
                    : "border-gray-200 bg-white shadow-gray-200/70"
                }`}
              >
                {featuredPost?.coverImage ? (
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="h-[390px] w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-[390px] items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 p-10">
                    <div className="text-center text-white">
                      <PenLine
                        size={48}
                        className="mx-auto mb-5 opacity-90"
                      />

                      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-100">
                        Write your story
                      </p>

                      <h2 className="mt-3 text-4xl font-black">
                        Think.
                        <br />
                        Create.
                        <br />
                        Share.
                      </h2>
                    </div>
                  </div>
                )}

                {/* Featured floating card */}

                {featuredPost && (
                  <div
                    className={`absolute -bottom-8 -left-8 max-w-xs rounded-2xl border p-5 shadow-xl ${
                      darkMode
                        ? "border-gray-800 bg-gray-900 shadow-black/40"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-500">
                      Featured article
                    </p>

                    <h3
                      className={`line-clamp-2 font-bold ${
                        darkMode
                          ? "text-white"
                          : "text-gray-950"
                      }`}
                    >
                      {featuredPost.title}
                    </h3>

                    <Link
                      to={`/post/${featuredPost._id}`}
                      className="mt-3 flex items-center gap-1 text-sm font-semibold text-indigo-500"
                    >
                      Read article

                      <ChevronRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ARTICLES
      ====================================================== */}

      <section
        id="posts"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20"
      >
        {/* Section heading */}

        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-500">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />

              Discover
            </div>

            <h2
              className={`text-3xl font-black tracking-tight sm:text-4xl ${
                darkMode
                  ? "text-white"
                  : "text-gray-950"
              }`}
            >
              Latest articles
            </h2>

            <p className="mt-2 text-gray-500">
              Fresh ideas and stories from our
              writers.
            </p>
          </div>

          {posts.length > 0 && (
            <span className="text-sm font-medium text-gray-500">
              {posts.length}{" "}
              {posts.length === 1
                ? "article"
                : "articles"}
            </span>
          )}
        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`overflow-hidden rounded-2xl border ${
                  darkMode
                    ? "border-gray-800 bg-gray-900"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div
                  className={`h-52 animate-pulse ${
                    darkMode
                      ? "bg-gray-800"
                      : "bg-gray-200"
                  }`}
                />

                <div className="space-y-4 p-5">
                  <div
                    className={`h-4 w-24 animate-pulse rounded ${
                      darkMode
                        ? "bg-gray-800"
                        : "bg-gray-200"
                    }`}
                  />

                  <div
                    className={`h-6 w-full animate-pulse rounded ${
                      darkMode
                        ? "bg-gray-800"
                        : "bg-gray-200"
                    }`}
                  />

                  <div
                    className={`h-4 w-3/4 animate-pulse rounded ${
                      darkMode
                        ? "bg-gray-800"
                        : "bg-gray-200"
                    }`}
                  />

                  <div
                    className={`h-4 w-1/2 animate-pulse rounded ${
                      darkMode
                        ? "bg-gray-800"
                        : "bg-gray-200"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {!loading && error && (
          <div
            className={`rounded-2xl border p-8 ${
              darkMode
                ? "border-red-900/60 bg-red-950/30"
                : "border-red-200 bg-red-50"
            }`}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p
                  className={`font-bold ${
                    darkMode
                      ? "text-red-400"
                      : "text-red-800"
                  }`}
                >
                  Unable to load articles
                </p>

                <p
                  className={`mt-1 text-sm ${
                    darkMode
                      ? "text-red-500"
                      : "text-red-600"
                  }`}
                >
                  {error}
                </p>
              </div>

              <button
                onClick={loadPosts}
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
              >
                <RefreshCw size={16} />

                Try again
              </button>
            </div>
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading &&
          !error &&
          posts.length === 0 && (
            <div
              className={`rounded-3xl border px-6 py-16 text-center shadow-sm ${
                darkMode
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${
                  darkMode
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                <PenLine size={27} />
              </div>

              <h3
                className={`mt-6 text-2xl font-bold ${
                  darkMode
                    ? "text-white"
                    : "text-gray-950"
                }`}
              >
                No articles yet
              </h3>

              <p
                className={`mx-auto mt-2 max-w-md ${
                  darkMode
                    ? "text-gray-500"
                    : "text-gray-500"
                }`}
              >
                Be the first person to share an
                idea, story or piece of knowledge
                with the community.
              </p>

              <Link
                to="/create"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
              >
                Write the first article

                <ArrowRight size={18} />
              </Link>
            </div>
          )}

        {/* =================================================
            ARTICLES
        ================================================= */}

        {!loading &&
          !error &&
          posts.length > 0 && (
            <>
              {/* FEATURED */}

              {featuredPost && (
                <div className="mb-8">
                  <div
                    className={`mb-4 flex items-center gap-2 text-sm font-bold ${
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-700"
                    }`}
                  >
                    <Sparkles
                      size={17}
                      className="text-indigo-500"
                    />

                    Featured
                  </div>

                  <Link
                    to={`/post/${featuredPost._id}`}
                    className={`group block overflow-hidden rounded-3xl border shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                      darkMode
                        ? "border-gray-800 bg-gray-900 hover:border-gray-700 hover:shadow-black/30"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="grid md:grid-cols-2">
                      {/* IMAGE */}

                      <div
                        className={`h-72 overflow-hidden md:h-96 ${
                          darkMode
                            ? "bg-gray-800"
                            : "bg-gray-100"
                        }`}
                      >
                        {featuredPost.coverImage ? (
                          <img
                            src={
                              featuredPost.coverImage
                            }
                            alt={
                              featuredPost.title
                            }
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
                            <BookOpen
                              size={55}
                              className="text-white/80"
                            />
                          </div>
                        )}
                      </div>

                      {/* CONTENT */}

                      <div className="flex flex-col justify-center p-7 sm:p-10">
                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                            darkMode
                              ? "bg-indigo-500/10 text-indigo-400"
                              : "bg-indigo-50 text-indigo-600"
                          }`}
                        >
                          Featured article
                        </span>

                        <h3
                          className={`mt-5 text-3xl font-black leading-tight sm:text-4xl ${
                            darkMode
                              ? "text-white"
                              : "text-gray-950"
                          }`}
                        >
                          {featuredPost.title}
                        </h3>

                        <p
                          className={`mt-4 line-clamp-3 leading-7 ${
                            darkMode
                              ? "text-gray-500"
                              : "text-gray-500"
                          }`}
                        >
                          Explore this article and
                          discover new ideas,
                          knowledge and perspectives
                          from our community.
                        </p>

                        <div className="mt-7 flex items-center gap-2 font-bold text-indigo-500">
                          Read article

                          <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* MORE ARTICLES */}

              {remainingPosts.length > 0 && (
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <h3
                      className={`text-xl font-bold ${
                        darkMode
                          ? "text-white"
                          : "text-gray-950"
                      }`}
                    >
                      More articles
                    </h3>
                  </div>

                  <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {remainingPosts.map(
                      (post) => (
                        <PostCard
                          key={post._id}
                          post={post}
                        />
                      )
                    )}
                  </div>
                </div>
              )}
            </>
          )}
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      {!loading && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <div
            className={`relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-10 ${
              darkMode
                ? "bg-gray-900 border border-gray-800"
                : "bg-gray-900"
            }`}
          >
            {/* Glow */}

            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-indigo-600/30 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-indigo-300">
                <PenLine size={22} />
              </div>

              <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
                Have a story to tell?
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-gray-400">
                Turn your ideas into an article and
                share them with people who want to
                learn something new.
              </p>

              <Link
                to="/create"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-gray-950 transition hover:bg-gray-100"
              >
                Start writing

                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer
        className={`border-t transition-colors duration-300 ${
          darkMode
            ? "border-gray-800 bg-gray-950"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            {/* BRAND */}

            <div>
              <Link
                to="/"
                className="flex items-center gap-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <PenLine size={18} />
                </div>

                <span
                  className={`text-xl font-black tracking-tight ${
                    darkMode
                      ? "text-white"
                      : "text-gray-950"
                  }`}
                >
                  SakshamRijal
                </span>
              </Link>

              <p
                className={`mt-3 max-w-sm text-sm leading-6 ${
                  darkMode
                    ? "text-gray-500"
                    : "text-gray-500"
                }`}
              >
                A simple publishing space for
                sharing ideas, knowledge, stories
                and experiences.
              </p>
            </div>

            {/* LINKS */}

            <div
              className={`flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium ${
                darkMode
                  ? "text-gray-500"
                  : "text-gray-500"
              }`}
            >
              <Link
                to="/"
                className="transition hover:text-indigo-500"
              >
                Home
              </Link>

              <a
                href="#posts"
                className="transition hover:text-indigo-500"
              >
                Articles
              </a>

              <Link
                to="/create"
                className="transition hover:text-indigo-500"
              >
                Write
              </Link>
            </div>
          </div>

          {/* BOTTOM */}

          <div
            className={`mt-10 flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between ${
              darkMode
                ? "border-gray-800 text-gray-600"
                : "border-gray-100 text-gray-400"
            }`}
          >
            <p>
              © {new Date().getFullYear()}{" "}
              SakshamRijal. All rights reserved.
            </p>

            <p>
              Built with passion for the web.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;