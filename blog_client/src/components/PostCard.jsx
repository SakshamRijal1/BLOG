import { Link } from "react-router-dom";
import {
  Clock,
  Heart,
  MessageCircle,
  ArrowUpRight,
  BookOpen,
  UserRound,
} from "lucide-react";

function PostCard({ post }) {
  const authorName = post.author?.name || "Anonymous";
  const authorImage =
    post.author?.profileImage || post.author?.profilePicture;

  // Depending on your backend populate structure
  const authorId =
    post.author?._id ||
    post.author?.id;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-800 dark:hover:shadow-indigo-950/30">

      {/* ================= IMAGE ================= */}

      <Link
        to={`/post/${post._id}`}
        className="relative block h-60 overflow-hidden bg-gray-100 dark:bg-gray-800"
      >
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600">

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-purple-300/20 blur-3xl" />

            <div className="relative flex flex-col items-center text-white">
              <BookOpen
                size={42}
                strokeWidth={1.5}
                className="mb-3 opacity-80"
              />

              <span className="text-6xl font-black uppercase">
                {post.title?.charAt(0) || "A"}
              </span>
            </div>
          </div>
        )}

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

        {/* Category */}

        {post.topics?.[0]?.topic && (
          <div className="absolute left-4 top-4 max-w-[75%]">
            <span className="inline-flex rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-md">
              {post.topics[0].topic}
            </span>
          </div>
        )}

        {/* Arrow */}

        <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-white text-gray-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </div>

        {/* Read time */}

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Clock size={14} />

            <span>
              {post.readTime || 1} min read
            </span>
          </div>
        </div>
      </Link>

      {/* ================= CONTENT ================= */}

      <div className="flex flex-1 flex-col p-5 sm:p-6">

        {/* ================= AUTHOR ================= */}

        <div className="mb-4 flex items-center justify-between">

          {authorId ? (
            <Link
              to={`/profile/${authorId}`}
              className="group/author flex min-w-0 items-center gap-3 rounded-xl p-1.5 -ml-1.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/70"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Avatar */}

              {authorImage ? (
                <img
                  src={authorImage}
                  alt={authorName}
                  className="h-10 w-10 rounded-full border border-gray-200 object-cover transition-transform duration-200 group-hover/author:scale-105 dark:border-gray-700"
                />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 transition-transform duration-200 group-hover/author:scale-105 dark:bg-indigo-950 dark:text-indigo-400">
                  {authorName.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Name */}

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-gray-800 transition-colors group-hover/author:text-indigo-600 dark:text-gray-200 dark:group-hover/author:text-indigo-400">
                  {authorName}
                </p>

                <p className="text-xs text-gray-400">
                  Article author
                </p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-3">

              {authorImage ? (
                <img
                  src={authorImage}
                  alt={authorName}
                  className="h-10 w-10 rounded-full border border-gray-200 object-cover dark:border-gray-700"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  {authorName.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  {authorName}
                </p>

                <p className="text-xs text-gray-400">
                  Article author
                </p>
              </div>
            </div>
          )}

          {/* View Profile */}

          {authorId && (
            <Link
              to={`/profile/${authorId}`}
              onClick={(event) => event.stopPropagation()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
              title="View profile"
            >
              <UserRound size={17} />
            </Link>
          )}
        </div>

        {/* ================= TITLE ================= */}

        <Link to={`/post/${post._id}`}>
          <h2 className="line-clamp-2 text-xl font-black leading-tight tracking-tight text-gray-950 transition-colors duration-200 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 sm:text-2xl">
            {post.title}
          </h2>
        </Link>

        {/* ================= DESCRIPTION ================= */}

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          {post.topics?.[0]?.topic ||
            "Explore this article and discover new ideas, knowledge and perspectives."}
        </p>

        <div className="flex-1" />

        {/* Divider */}

        <div className="my-5 h-px bg-gray-100 dark:bg-gray-800" />

        {/* Bottom */}

        <div className="flex items-center justify-between">

          {/* Stats */}

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">

            <span className="flex items-center gap-1.5">
              <Heart
                size={16}
                className="transition-colors group-hover:text-red-500"
              />

              {post.likes?.length || 0}
            </span>

            <span className="flex items-center gap-1.5">
              <MessageCircle size={16} />

              {post.comments?.length || 0}
            </span>
          </div>

          {/* Read */}

          <Link
            to={`/post/${post._id}`}
            className="group/read inline-flex items-center gap-1.5 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-indigo-600 dark:bg-white dark:text-gray-950 dark:hover:bg-indigo-500 dark:hover:text-white"
          >
            Read

            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 group-hover/read:translate-x-0.5 group-hover/read:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PostCard;