import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Share2,
  Trash2,
  Clock,
  Calendar,
  ArrowLeft,
  Send,
  BookOpen,
  Check,
} from "lucide-react";

import { api } from "../api";
import { useTheme } from "../context/ThemeContext";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // =========================
  // GLOBAL THEME
  // =========================

  const { darkMode } = useTheme();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const token = localStorage.getItem("token");

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // =========================
  // LOAD POST
  // =========================

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await api.getPost(id);

        setPost(data);

        if (currentUser && data.likes) {
          setLiked(
            data.likes.some(
              (userId) =>
                userId.toString() ===
                currentUser.id.toString()
            )
          );
        }
      } catch (error) {
        setError(
          error.message ||
            "Unable to load this article."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  // =========================
  // LIKE
  // =========================

  const handleLike = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const data = await api.likePost(id, token);

      setLiked(data.liked);

      setPost((prev) => ({
        ...prev,
        likes: Array(data.likes).fill("like"),
      }));
    } catch (error) {
      alert(error.message);
    }
  };

  // =========================
  // COMMENT
  // =========================

  const handleComment = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }

    if (!comment.trim()) return;

    try {
      setCommentLoading(true);

      const updatedPost = await api.addComment(
        id,
        comment,
        token
      );

      setPost(updatedPost);
      setComment("");
    } catch (error) {
      alert(error.message);
    } finally {
      setCommentLoading(false);
    }
  };

  // =========================
  // SHARE
  // =========================

  const handleShare = async () => {
    try {
      const data = await api.sharePost(id);

      setPost((prev) => ({
        ...prev,
        shares: data.shares,
      }));

      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: `Read "${post.title}"`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!confirmed) return;

    try {
      await api.deletePost(id, token);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main
        className={`min-h-screen px-4 py-16 transition-colors duration-300 sm:px-6 ${
          darkMode
            ? "bg-gray-950"
            : "bg-[#f8fafc]"
        }`}
      >
        <div className="mx-auto max-w-5xl">
          <div className="animate-pulse space-y-7">
            <div
              className={`h-5 w-24 rounded ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-gray-200"
              }`}
            />

            <div
              className={`h-14 w-4/5 rounded ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-gray-200"
              }`}
            />

            <div
              className={`h-5 w-2/5 rounded ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-gray-200"
              }`}
            />

            <div
              className={`h-[420px] rounded-3xl ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-gray-200"
              }`}
            />

            <div className="space-y-4">
              <div
                className={`h-5 w-full rounded ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-gray-200"
                }`}
              />

              <div
                className={`h-5 w-full rounded ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-gray-200"
                }`}
              />

              <div
                className={`h-5 w-5/6 rounded ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-gray-200"
                }`}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error || !post) {
    return (
      <main
        className={`flex min-h-screen items-center justify-center px-4 transition-colors duration-300 ${
          darkMode
            ? "bg-gray-950"
            : "bg-[#f8fafc]"
        }`}
      >
        <div
          className={`w-full max-w-lg rounded-3xl border p-10 text-center shadow-xl ${
            darkMode
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <div
            className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${
              darkMode
                ? "bg-red-950 text-red-400"
                : "bg-red-50 text-red-500"
            }`}
          >
            <BookOpen size={24} />
          </div>

          <h1
            className={`mt-5 text-2xl font-black ${
              darkMode
                ? "text-white"
                : "text-gray-950"
            }`}
          >
            Article not found
          </h1>

          <p
            className={`mt-2 ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            {error ||
              "The article you're looking for doesn't exist."}
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft size={18} />
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  // =========================
  // DATA
  // =========================

  const isAuthor =
    currentUser &&
    post.author &&
    currentUser.id === post.author._id;

  const commentCount =
    post.comments?.length || 0;

  const likeCount =
    post.likes?.length || 0;

  const formattedDate = new Date(
    post.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-950 text-gray-100"
          : "bg-[#f8fafc] text-gray-900"
      }`}
    >
      {/* =========================
          TOP BAR
      ========================= */}

      <div
        className={`sticky top-0 z-40 border-b backdrop-blur-xl ${
          darkMode
            ? "border-gray-800 bg-gray-950/90"
            : "border-gray-200 bg-white/90"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
              darkMode
                ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-950"
            }`}
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div
            className={`flex items-center gap-2 text-sm font-semibold ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            <BookOpen size={17} />
            Article
          </div>
        </div>
      </div>

      {/* =========================
          HEADER
      ========================= */}

      <header
        className={`border-b ${
          darkMode
            ? "border-gray-800 bg-gray-950"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16">
          {/* AUTHOR META */}

          <div
            className={`flex flex-wrap items-center gap-x-5 gap-y-3 text-sm ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                {post.author?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "A"}
              </div>

              <span
                className={`font-semibold ${
                  darkMode
                    ? "text-gray-200"
                    : "text-gray-800"
                }`}
              >
                {post.author?.name ||
                  "Anonymous"}
              </span>
            </div>

            <span
              className={`hidden h-4 w-px sm:block ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-gray-200"
              }`}
            />

            <span className="flex items-center gap-1.5">
              <Calendar size={15} />
              {formattedDate}
            </span>

            <span
              className={`hidden h-4 w-px sm:block ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-gray-200"
              }`}
            />

            <span className="flex items-center gap-1.5">
              <Clock size={15} />
              {post.readTime || 1} min read
            </span>
          </div>

          {/* TITLE */}

          <h1
            className={`mt-8 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl ${
              darkMode
                ? "text-white"
                : "text-gray-950"
            }`}
          >
            {post.title}
          </h1>

          {/* INTRO */}

          <p
            className={`mt-6 max-w-3xl text-lg leading-8 ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Explore this article and discover
            useful ideas, knowledge and perspectives
            from the writer.
          </p>

          {/* COVER */}

          {post.coverImage && (
            <div
              className={`mt-10 overflow-hidden rounded-3xl border shadow-2xl ${
                darkMode
                  ? "border-gray-800 bg-gray-900 shadow-black/30"
                  : "border-gray-200 bg-gray-100 shadow-gray-200/50"
              }`}
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="max-h-[600px] w-full object-cover"
              />
            </div>
          )}

          {/* ACTIONS */}

          <div
            className={`mt-8 flex flex-wrap items-center gap-2 border-y py-4 ${
              darkMode
                ? "border-gray-800"
                : "border-gray-200"
            }`}
          >
            {/* LIKE */}

            <button
              type="button"
              onClick={handleLike}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                liked
                  ? darkMode
                    ? "bg-red-950 text-red-400"
                    : "bg-red-50 text-red-600"
                  : darkMode
                  ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Heart
                size={19}
                className={
                  liked
                    ? "fill-red-500 text-red-500"
                    : ""
                }
              />

              {likeCount}

              <span className="hidden sm:inline">
                Likes
              </span>
            </button>

            {/* COMMENTS */}

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("comments")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                darkMode
                  ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <MessageCircle size={19} />

              {commentCount}

              <span className="hidden sm:inline">
                Comments
              </span>
            </button>

            {/* SHARE */}

            <button
              type="button"
              onClick={handleShare}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                darkMode
                  ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {copied ? (
                <Check size={19} />
              ) : (
                <Share2 size={19} />
              )}

              {copied
                ? "Copied"
                : post.shares || 0}

              {!copied && (
                <span className="hidden sm:inline">
                  Shares
                </span>
              )}
            </button>

            {/* DELETE */}

            {isAuthor && (
              <button
                type="button"
                onClick={handleDelete}
                className={`ml-auto flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  darkMode
                    ? "text-red-400 hover:bg-red-950/50"
                    : "text-red-500 hover:bg-red-50"
                }`}
              >
                <Trash2 size={18} />
                Delete
              </button>
            )}
          </div>
        </div>
      </header>

      {/* =========================
          ARTICLE
      ========================= */}

      <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_220px]">
          {/* CONTENT */}

          <div className="min-w-0">
            {post.topics?.map(
              (topic, topicIndex) => (
                <section
                  key={
                    topic._id ||
                    topicIndex
                  }
                  className="mb-16"
                >
                  {/* TOPIC */}

                  <div className="mb-7 flex items-start gap-4">
                    <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                      {topicIndex + 1}
                    </div>

                    <h2
                      className={`pt-0.5 text-2xl font-black leading-tight sm:text-3xl ${
                        darkMode
                          ? "text-white"
                          : "text-gray-950"
                      }`}
                    >
                      {topic.topic}
                    </h2>
                  </div>

                  {/* CONTENT */}

                  <div>
                    {topic.content?.map(
                      (item, index) => {
                        if (
                          item.type ===
                          "paragraph"
                        ) {
                          return (
                            <p
                              key={
                                item._id ||
                                index
                              }
                              className={`mb-7 text-[17px] leading-8 sm:text-lg sm:leading-9 ${
                                darkMode
                                  ? "text-gray-300"
                                  : "text-gray-700"
                              }`}
                            >
                              {item.text}
                            </p>
                          );
                        }

                        if (
                          item.type ===
                          "image"
                        ) {
                          return (
                            <figure
                              key={
                                item._id ||
                                index
                              }
                              className="my-10"
                            >
                              <div
                                className={`overflow-hidden rounded-2xl border shadow-lg ${
                                  darkMode
                                    ? "border-gray-800 bg-gray-900 shadow-black/20"
                                    : "border-gray-200 bg-white shadow-gray-200/40"
                                }`}
                              >
                                <img
                                  src={
                                    item.url
                                  }
                                  alt={
                                    item.caption ||
                                    topic.topic
                                  }
                                  className="mx-auto max-h-[650px] w-full object-contain"
                                />
                              </div>

                              {item.caption && (
                                <figcaption
                                  className={`mt-3 text-center text-sm ${
                                    darkMode
                                      ? "text-gray-500"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {
                                    item.caption
                                  }
                                </figcaption>
                              )}
                            </figure>
                          );
                        }

                        return null;
                      }
                    )}
                  </div>
                </section>
              )
            )}

            {/* END */}

            <div
              className={`border-t pt-8 ${
                darkMode
                  ? "border-gray-800"
                  : "border-gray-200"
              }`}
            >
              <div
                className={`flex items-center gap-3 text-sm font-semibold ${
                  darkMode
                    ? "text-gray-600"
                    : "text-gray-400"
                }`}
              >
                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                End of article
              </div>
            </div>
          </div>

          {/* =========================
              SIDEBAR
          ========================= */}

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              {/* INFO */}

              <div
                className={`rounded-2xl border p-5 shadow-sm ${
                  darkMode
                    ? "border-gray-800 bg-gray-900"
                    : "border-gray-200 bg-white"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                  Article
                </p>

                <div className="mt-4 space-y-4">
                  <div>
                    <p
                      className={`text-xs ${
                        darkMode
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      Written by
                    </p>

                    <p
                      className={`mt-1 font-semibold ${
                        darkMode
                          ? "text-gray-200"
                          : "text-gray-900"
                      }`}
                    >
                      {post.author?.name ||
                        "Anonymous"}
                    </p>
                  </div>

                  <div>
                    <p
                      className={`text-xs ${
                        darkMode
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      Published
                    </p>

                    <p
                      className={`mt-1 font-semibold ${
                        darkMode
                          ? "text-gray-200"
                          : "text-gray-900"
                      }`}
                    >
                      {formattedDate}
                    </p>
                  </div>

                  <div>
                    <p
                      className={`text-xs ${
                        darkMode
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      Reading time
                    </p>

                    <p
                      className={`mt-1 font-semibold ${
                        darkMode
                          ? "text-gray-200"
                          : "text-gray-900"
                      }`}
                    >
                      {post.readTime ||
                        1}{" "}
                      minutes
                    </p>
                  </div>
                </div>
              </div>

              {/* TOPICS */}

              {post.topics?.length >
                0 && (
                <div
                  className={`rounded-2xl border p-5 shadow-sm ${
                    darkMode
                      ? "border-gray-800 bg-gray-900"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-wider ${
                      darkMode
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    In this article
                  </p>

                  <div className="mt-4 space-y-3">
                    {post.topics.map(
                      (
                        topic,
                        index
                      ) => (
                        <div
                          key={
                            topic._id ||
                            index
                          }
                          className={`flex gap-2 text-sm ${
                            darkMode
                              ? "text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          <span className="font-bold text-indigo-500">
                            {index + 1}.
                          </span>

                          <span className="line-clamp-2">
                            {
                              topic.topic
                            }
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>

      {/* =========================
          COMMENTS
      ========================= */}

      <section
        id="comments"
        className={`border-t ${
          darkMode
            ? "border-gray-800 bg-gray-900"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          {/* HEADING */}

          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  darkMode
                    ? "bg-indigo-950 text-indigo-400"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                <MessageCircle size={21} />
              </div>

              <div>
                <h2
                  className={`text-2xl font-black sm:text-3xl ${
                    darkMode
                      ? "text-white"
                      : "text-gray-950"
                  }`}
                >
                  Join the conversation
                </h2>

                <p
                  className={`mt-1 text-sm ${
                    darkMode
                      ? "text-gray-500"
                      : "text-gray-500"
                  }`}
                >
                  {commentCount ===
                  0
                    ? "Be the first to share your thoughts."
                    : `${commentCount} ${
                        commentCount ===
                        1
                          ? "comment"
                          : "comments"
                      } on this article.`}
                </p>
              </div>
            </div>
          </div>

          {/* COMMENT FORM */}

          <form
            onSubmit={handleComment}
            className={`mb-10 rounded-2xl border p-4 sm:p-5 ${
              darkMode
                ? "border-gray-800 bg-gray-950"
                : "border-gray-200 bg-[#f8fafc]"
            }`}
          >
            <textarea
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
              placeholder={
                token
                  ? "Share your thoughts..."
                  : "Login to leave a comment..."
              }
              disabled={!token}
              rows={4}
              className={`w-full resize-none rounded-xl border p-4 text-sm leading-7 outline-none transition ${
                darkMode
                  ? "border-gray-800 bg-gray-900 text-gray-200 placeholder:text-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950 disabled:bg-gray-800"
                  : "border-gray-200 bg-white text-gray-700 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:bg-gray-100"
              }`}
            />

            <div className="mt-3 flex items-center justify-between gap-4">
              {!token ? (
                <Link
                  to="/login"
                  className="text-sm font-semibold text-indigo-500 hover:underline"
                >
                  Login to comment
                </Link>
              ) : (
                <span
                  className={`text-xs ${
                    darkMode
                      ? "text-gray-600"
                      : "text-gray-400"
                  }`}
                >
                  Be respectful and constructive.
                </span>
              )}

              <button
                type="submit"
                disabled={
                  commentLoading ||
                  !comment.trim() ||
                  !token
                }
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={16} />

                {commentLoading
                  ? "Posting..."
                  : "Post comment"}
              </button>
            </div>
          </form>

          {/* COMMENTS LIST */}

          <div className="space-y-4">
            {commentCount ===
              0 && (
              <div
                className={`rounded-2xl border border-dashed p-10 text-center ${
                  darkMode
                    ? "border-gray-700 bg-gray-950"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl shadow-sm ${
                    darkMode
                      ? "bg-gray-900 text-gray-600"
                      : "bg-white text-gray-400"
                  }`}
                >
                  <MessageCircle
                    size={22}
                  />
                </div>

                <h3
                  className={`mt-4 font-bold ${
                    darkMode
                      ? "text-gray-200"
                      : "text-gray-800"
                  }`}
                >
                  No comments yet
                </h3>

                <p
                  className={`mt-1 text-sm ${
                    darkMode
                      ? "text-gray-500"
                      : "text-gray-500"
                  }`}
                >
                  Start the conversation by sharing
                  your thoughts.
                </p>
              </div>
            )}

            {post.comments?.map(
              (item) => (
                <div
                  key={item._id}
                  className={`rounded-2xl border p-5 transition hover:shadow-md ${
                    darkMode
                      ? "border-gray-800 bg-gray-950 hover:border-gray-700"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                      {item.user?.name
                        ?.charAt(0)
                        ?.toUpperCase() ||
                        "U"}
                    </div>

                    <div>
                      <p
                        className={`font-bold ${
                          darkMode
                            ? "text-gray-200"
                            : "text-gray-900"
                        }`}
                      >
                        {item.user?.name ||
                          "Anonymous"}
                      </p>

                      <p
                        className={`text-xs ${
                          darkMode
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <p
                    className={`mt-4 whitespace-pre-wrap text-[15px] leading-7 ${
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-700"
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer
        className={`border-t ${
          darkMode
            ? "border-gray-800 bg-black"
            : "border-gray-200 bg-gray-950"
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <Link
              to="/"
              className="flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <BookOpen size={17} />
              </div>

              <span className="font-black text-white">
                SakshamRijal
              </span>
            </Link>

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()}{" "}
              SakshamRijal. Built for sharing ideas.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default PostDetails;