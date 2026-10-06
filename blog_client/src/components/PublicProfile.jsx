import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Calendar,
  FileText,
  UserRound,
} from "lucide-react";

import api from "../services/api";

function PublicProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/users/${id}`);

        setUser(response.data.user);
        setPosts(response.data.posts || []);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
        <div className="text-center">
          <UserRound
            size={50}
            className="mx-auto mb-4 text-gray-400"
          />

          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            User not found
          </h1>

          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700"
          >
            <ArrowLeft size={17} />
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Back */}

        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft size={17} />
          Back
        </Link>

        {/* Profile Card */}

        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

          {/* Cover */}

          <div className="h-36 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 sm:h-48" />

          <div className="px-6 pb-7 sm:px-8">

            {/* Avatar */}

            <div className="-mt-14 flex items-end justify-between sm:-mt-16">

              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-lg dark:border-gray-900"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-white bg-indigo-100 text-4xl font-black text-indigo-600 shadow-lg dark:border-gray-900 dark:bg-indigo-950 dark:text-indigo-400">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* User info */}

            <div className="mt-5">

              <h1 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white">
                {user.name}
              </h1>

              {user.username && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  @{user.username}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">

                {user.email && (
                  <span className="flex items-center gap-2">
                    <Mail size={16} />
                    {user.email}
                  </span>
                )}

                {user.createdAt && (
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    Joined{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                )}

                <span className="flex items-center gap-2">
                  <FileText size={16} />
                  {posts.length}{" "}
                  {posts.length === 1 ? "Article" : "Articles"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Articles */}

        <section className="mt-8">

          <div className="mb-5">
            <h2 className="text-2xl font-black text-gray-950 dark:text-white">
              Articles by {user.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Explore articles published by this author.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
              <FileText
                size={40}
                className="mx-auto mb-4 text-gray-400"
              />

              <p className="font-semibold text-gray-700 dark:text-gray-300">
                No articles published yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  to={`/post/${post._id}`}
                  className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-800"
                >
                  <h3 className="line-clamp-2 text-lg font-black text-gray-900 dark:text-white">
                    {post.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {post.topics?.[0]?.topic ||
                      "Read this article."}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default PublicProfile;