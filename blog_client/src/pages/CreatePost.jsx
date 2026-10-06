import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  FileText,
  Clock,
  BookOpen,
  ArrowLeft,
  Eye,
  Sparkles,
  X,
  Hash,
  Type,
} from "lucide-react";

import { api } from "../api";
import { useTheme } from "../context/ThemeContext";

function CreatePost() {
  const navigate = useNavigate();

  // GLOBAL THEME
  const { darkMode } = useTheme();

  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const [topics, setTopics] = useState([
    {
      topic: "",
      content: [
        {
          type: "paragraph",
          text: "",
        },
      ],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // READING TIME
  // =====================================================

  const readTime = useMemo(() => {
    let words = 0;

    topics.forEach((topic) => {
      topic.content.forEach((item) => {
        if (
          item.type === "paragraph" &&
          item.text.trim()
        ) {
          words += item.text
            .trim()
            .split(/\s+/).length;
        }
      });
    });

    return Math.max(1, Math.ceil(words / 200));
  }, [topics]);

  // =====================================================
  // WORD COUNT
  // =====================================================

  const wordCount = useMemo(() => {
    let words = 0;

    topics.forEach((topic) => {
      topic.content.forEach((item) => {
        if (
          item.type === "paragraph" &&
          item.text.trim()
        ) {
          words += item.text
            .trim()
            .split(/\s+/).length;
        }
      });
    });

    return words;
  }, [topics]);

  // =====================================================
  // CHARACTER COUNT
  // =====================================================

  const titleLength = title.length;

  // =====================================================
  // UPDATE TOPIC
  // =====================================================

  const updateTopic = (topicIndex, value) => {
    const updated = [...topics];

    updated[topicIndex].topic = value;

    setTopics(updated);
  };

  // =====================================================
  // UPDATE CONTENT
  // =====================================================

  const updateContent = (
    topicIndex,
    contentIndex,
    field,
    value
  ) => {
    const updated = [...topics];

    updated[topicIndex].content[contentIndex][field] =
      value;

    setTopics(updated);
  };

  // =====================================================
  // ADD TOPIC
  // =====================================================

  const addTopic = () => {
    setTopics([
      ...topics,
      {
        topic: "",
        content: [
          {
            type: "paragraph",
            text: "",
          },
        ],
      },
    ]);
  };

  // =====================================================
  // DELETE TOPIC
  // =====================================================

  const deleteTopic = (topicIndex) => {
    if (topics.length === 1) return;

    setTopics(
      topics.filter(
        (_, index) => index !== topicIndex
      )
    );
  };

  // =====================================================
  // ADD PARAGRAPH
  // =====================================================

  const addParagraph = (topicIndex) => {
    const updated = [...topics];

    updated[topicIndex].content.push({
      type: "paragraph",
      text: "",
    });

    setTopics(updated);
  };

  // =====================================================
  // ADD IMAGE
  // =====================================================

  const addImage = (topicIndex) => {
    const updated = [...topics];

    updated[topicIndex].content.push({
      type: "image",
      url: "",
      caption: "",
    });

    setTopics(updated);
  };

  // =====================================================
  // DELETE CONTENT
  // =====================================================

  const deleteContent = (
    topicIndex,
    contentIndex
  ) => {
    const updated = [...topics];

    if (
      updated[topicIndex].content.length === 1
    ) {
      return;
    }

    updated[topicIndex].content =
      updated[topicIndex].content.filter(
        (_, index) => index !== contentIndex
      );

    setTopics(updated);
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!title.trim()) {
      setError(
        "Please enter an article title."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const validTopics = topics.filter(
      (topic) =>
        topic.topic.trim() &&
        topic.content.some(
          (item) =>
            (item.type === "paragraph" &&
              item.text.trim()) ||
            (item.type === "image" &&
              item.url.trim())
        )
    );

    if (validTopics.length === 0) {
      setError(
        "Please add at least one topic with content."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    try {
      setLoading(true);

      const post = await api.createPost(
        {
          title,
          coverImage,
          topics: validTopics,
        },
        token
      );

      navigate(`/post/${post._id}`);
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong while publishing."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-950 text-gray-100"
          : "bg-[#f8fafc] text-gray-900"
      }`}
    >
      {/* =================================================
          TOP BAR
      ================================================= */}

      <div
        className={`sticky top-0 z-30 border-b backdrop-blur-xl transition-colors ${
          darkMode
            ? "border-gray-800 bg-gray-950/90"
            : "border-gray-200 bg-white/90"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
              darkMode
                ? "text-gray-400 hover:bg-gray-900 hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          <div
            className={`flex items-center gap-2 text-sm font-semibold ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            <BookOpen
              size={17}
              className="text-indigo-500"
            />

            <span className="hidden sm:block">
              Article Editor
            </span>
          </div>

          <div
            className={`rounded-full px-3 py-1.5 text-xs font-bold ${
              darkMode
                ? "bg-gray-900 text-gray-400"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {wordCount} words
          </div>
        </div>
      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        {/* HEADER */}

        <div className="mb-10">
          <div
            className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
              darkMode
                ? "border-indigo-500/20 bg-indigo-500/10 text-indigo-400"
                : "border-indigo-100 bg-indigo-50 text-indigo-600"
            }`}
          >
            <Sparkles size={14} />
            Create article
          </div>

          <h1
            className={`text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${
              darkMode
                ? "text-white"
                : "text-gray-950"
            }`}
          >
            Write something worth reading.
          </h1>

          <p
            className={`mt-3 max-w-2xl text-base leading-7 ${
              darkMode
                ? "text-gray-500"
                : "text-gray-500"
            }`}
          >
            Share your knowledge, ideas and
            stories with a structured article
            containing topics, paragraphs and
            images.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div
              className={`mb-6 flex items-start gap-3 rounded-2xl border p-4 ${
                darkMode
                  ? "border-red-900/60 bg-red-950/30 text-red-400"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              <X
                size={18}
                className="mt-0.5 shrink-0"
              />

              <div>
                <p className="font-semibold">
                  Unable to publish
                </p>

                <p className="mt-1 text-sm opacity-80">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* =================================================
              EDITOR GRID
          ================================================= */}

          <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
            {/* =================================================
                LEFT
            ================================================= */}

            <div className="space-y-7">
              {/* =================================================
                  ARTICLE INFORMATION
              ================================================= */}

              <section
                className={`overflow-hidden rounded-2xl border shadow-sm transition-colors ${
                  darkMode
                    ? "border-gray-800 bg-gray-900"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div
                  className={`border-b px-6 py-5 ${
                    darkMode
                      ? "border-gray-800"
                      : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        darkMode
                          ? "bg-indigo-500/10 text-indigo-400"
                          : "bg-indigo-50 text-indigo-600"
                      }`}
                    >
                      <BookOpen size={19} />
                    </div>

                    <div>
                      <h2
                        className={`font-bold ${
                          darkMode
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        Article information
                      </h2>

                      <p className="text-sm text-gray-500">
                        Start with a strong title
                        and cover.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-7 p-6">
                  {/* TITLE */}

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        className={`flex items-center gap-2 text-sm font-semibold ${
                          darkMode
                            ? "text-gray-300"
                            : "text-gray-700"
                        }`}
                      >
                        <Type size={16} />
                        Article title
                      </label>

                      <span className="text-xs text-gray-500">
                        {titleLength} characters
                      </span>
                    </div>

                    <input
                      value={title}
                      onChange={(e) =>
                        setTitle(e.target.value)
                      }
                      placeholder="Give your article a great title..."
                      className={`w-full rounded-xl border px-4 py-4 text-xl font-semibold outline-none transition placeholder:text-gray-500 ${
                        darkMode
                          ? "border-gray-800 bg-gray-950 text-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/40"
                          : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                      }`}
                    />

                    <p className="mt-2 text-xs text-gray-500">
                      A clear title helps readers
                      understand what your article
                      is about.
                    </p>
                  </div>

                  {/* COVER */}

                  <div>
                    <label
                      className={`mb-2 flex items-center gap-2 text-sm font-semibold ${
                        darkMode
                          ? "text-gray-300"
                          : "text-gray-700"
                      }`}
                    >
                      <ImageIcon size={16} />
                      Cover image
                    </label>

                    <input
                      value={coverImage}
                      onChange={(e) =>
                        setCoverImage(e.target.value)
                      }
                      placeholder="https://example.com/cover.jpg"
                      className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 ${
                        darkMode
                          ? "border-gray-800 bg-gray-950 text-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/40"
                          : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                      }`}
                    />

                    {coverImage && (
                      <div
                        className={`relative mt-4 overflow-hidden rounded-xl border ${
                          darkMode
                            ? "border-gray-800 bg-gray-950"
                            : "border-gray-200 bg-gray-100"
                        }`}
                      >
                        <img
                          src={coverImage}
                          alt="Cover preview"
                          className="h-56 w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />

                        <div className="absolute left-3 top-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                          Cover preview
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* =================================================
                  TOPICS
              ================================================= */}

              {topics.map(
                (topic, topicIndex) => (
                  <section
                    key={topicIndex}
                    className={`overflow-hidden rounded-2xl border shadow-sm transition-colors ${
                      darkMode
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {/* TOPIC HEADER */}

                    <div
                      className={`flex items-center justify-between border-b px-6 py-5 ${
                        darkMode
                          ? "border-gray-800"
                          : "border-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
                          {topicIndex + 1}
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                            Section {topicIndex + 1}
                          </p>

                          <h2
                            className={`font-bold ${
                              darkMode
                                ? "text-white"
                                : "text-gray-900"
                            }`}
                          >
                            Article topic
                          </h2>
                        </div>
                      </div>

                      {topics.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            deleteTopic(
                              topicIndex
                            )
                          }
                          title="Delete topic"
                          className={`rounded-lg p-2 transition ${
                            darkMode
                              ? "text-gray-600 hover:bg-red-950/40 hover:text-red-400"
                              : "text-gray-400 hover:bg-red-50 hover:text-red-500"
                          }`}
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="p-6">
                      {/* TOPIC TITLE */}

                      <div className="relative mb-7">
                        <Hash
                          size={20}
                          className={`absolute left-1 top-1/2 -translate-y-1/2 ${
                            darkMode
                              ? "text-gray-600"
                              : "text-gray-300"
                          }`}
                        />

                        <input
                          value={topic.topic}
                          onChange={(e) =>
                            updateTopic(
                              topicIndex,
                              e.target.value
                            )
                          }
                          placeholder="e.g. What is Artificial Intelligence?"
                          className={`w-full border-b-2 bg-transparent py-3 pl-8 pr-1 text-2xl font-bold outline-none transition placeholder:text-gray-600 ${
                            darkMode
                              ? "border-gray-800 text-white placeholder:text-gray-700 focus:border-indigo-500"
                              : "border-gray-200 text-gray-900 placeholder:text-gray-300 focus:border-indigo-500"
                          }`}
                        />
                      </div>

                      {/* CONTENT BLOCKS */}

                      <div className="space-y-5">
                        {topic.content.map(
                          (
                            item,
                            contentIndex
                          ) => {
                            // PARAGRAPH

                            if (
                              item.type ===
                              "paragraph"
                            ) {
                              return (
                                <div
                                  key={
                                    contentIndex
                                  }
                                  className={`group rounded-xl border p-4 transition ${
                                    darkMode
                                      ? "border-gray-800 bg-gray-950 focus-within:border-indigo-500/40 focus-within:bg-gray-950"
                                      : "border-gray-200 bg-gray-50 focus-within:border-indigo-200 focus-within:bg-white"
                                  }`}
                                >
                                  <div className="mb-3 flex items-center justify-between">
                                    <div
                                      className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                                        darkMode
                                          ? "text-gray-500"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      <FileText
                                        size={15}
                                      />
                                      Paragraph
                                    </div>

                                    {topic.content
                                      .length >
                                      1 && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deleteContent(
                                            topicIndex,
                                            contentIndex
                                          )
                                        }
                                        className={`rounded-md p-1.5 opacity-0 transition group-hover:opacity-100 ${
                                          darkMode
                                            ? "text-gray-600 hover:bg-red-950/40 hover:text-red-400"
                                            : "text-gray-400 hover:bg-red-50 hover:text-red-500"
                                        }`}
                                        title="Delete paragraph"
                                      >
                                        <Trash2
                                          size={
                                            15
                                          }
                                        />
                                      </button>
                                    )}
                                  </div>

                                  <textarea
                                    value={
                                      item.text
                                    }
                                    onChange={(e) =>
                                      updateContent(
                                        topicIndex,
                                        contentIndex,
                                        "text",
                                        e.target
                                          .value
                                      )
                                    }
                                    placeholder="Start writing your paragraph..."
                                    rows={7}
                                    className={`w-full resize-y rounded-lg border-0 bg-transparent p-1 text-[15px] leading-7 outline-none placeholder:text-gray-600 ${
                                      darkMode
                                        ? "text-gray-300 placeholder:text-gray-700"
                                        : "text-gray-700 placeholder:text-gray-400"
                                    }`}
                                  />

                                  {item.text && (
                                    <div className="mt-2 text-right text-xs text-gray-600">
                                      {
                                        item.text
                                          .trim()
                                          .split(
                                            /\s+/
                                          )
                                          .filter(
                                            Boolean
                                          ).length
                                      }{" "}
                                      words
                                    </div>
                                  )}
                                </div>
                              );
                            }

                            // IMAGE

                            if (
                              item.type ===
                              "image"
                            ) {
                              return (
                                <div
                                  key={
                                    contentIndex
                                  }
                                  className={`rounded-xl border p-5 ${
                                    darkMode
                                      ? "border-indigo-500/20 bg-indigo-500/5"
                                      : "border-indigo-100 bg-indigo-50/60"
                                  }`}
                                >
                                  <div className="mb-5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                          darkMode
                                            ? "bg-indigo-500/10 text-indigo-400"
                                            : "bg-indigo-100 text-indigo-600"
                                        }`}
                                      >
                                        <ImageIcon
                                          size={17}
                                        />
                                      </div>

                                      <div>
                                        <p
                                          className={`text-sm font-bold ${
                                            darkMode
                                              ? "text-indigo-300"
                                              : "text-indigo-900"
                                          }`}
                                        >
                                          Article image
                                        </p>

                                        <p className="text-xs text-indigo-500">
                                          Add a visual
                                          to your
                                          section
                                        </p>
                                      </div>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        deleteContent(
                                          topicIndex,
                                          contentIndex
                                        )
                                      }
                                      className={`rounded-lg p-2 transition ${
                                        darkMode
                                          ? "text-gray-600 hover:bg-red-950/40 hover:text-red-400"
                                          : "text-gray-400 hover:bg-red-50 hover:text-red-500"
                                      }`}
                                      title="Delete image"
                                    >
                                      <Trash2
                                        size={17}
                                      />
                                    </button>
                                  </div>

                                  {/* IMAGE URL */}

                                  <input
                                    value={
                                      item.url
                                    }
                                    onChange={(e) =>
                                      updateContent(
                                        topicIndex,
                                        contentIndex,
                                        "url",
                                        e.target
                                          .value
                                      )
                                    }
                                    placeholder="https://example.com/image.jpg"
                                    className={`mb-3 w-full rounded-lg border px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 ${
                                      darkMode
                                        ? "border-gray-800 bg-gray-950 text-gray-200 placeholder:text-gray-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/40"
                                        : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                    }`}
                                  />

                                  {/* CAPTION */}

                                  <input
                                    value={
                                      item.caption
                                    }
                                    onChange={(e) =>
                                      updateContent(
                                        topicIndex,
                                        contentIndex,
                                        "caption",
                                        e.target
                                          .value
                                      )
                                    }
                                    placeholder="Image caption (optional)"
                                    className={`mb-4 w-full rounded-lg border px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 ${
                                      darkMode
                                        ? "border-gray-800 bg-gray-950 text-gray-200 placeholder:text-gray-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/40"
                                        : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                    }`}
                                  />

                                  {/* IMAGE PREVIEW */}

                                  {item.url && (
                                    <div
                                      className={`overflow-hidden rounded-xl border ${
                                        darkMode
                                          ? "border-gray-800 bg-gray-950"
                                          : "border-gray-200 bg-white"
                                      }`}
                                    >
                                      <img
                                        src={
                                          item.url
                                        }
                                        alt={
                                          item.caption ||
                                          "Article preview"
                                        }
                                        className="max-h-[420px] w-full object-contain"
                                        onError={(e) => {
                                          e.currentTarget.style.display =
                                            "none";
                                        }}
                                      />

                                      {item.caption && (
                                        <div
                                          className={`border-t px-4 py-3 text-center text-xs ${
                                            darkMode
                                              ? "border-gray-800 text-gray-500"
                                              : "border-gray-100 text-gray-500"
                                          }`}
                                        >
                                          {
                                            item.caption
                                          }
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            }

                            return null;
                          }
                        )}
                      </div>

                      {/* ADD CONTENT */}

                      <div
                        className={`mt-6 flex flex-wrap gap-3 border-t pt-5 ${
                          darkMode
                            ? "border-gray-800"
                            : "border-gray-100"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            addParagraph(
                              topicIndex
                            )
                          }
                          className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                            darkMode
                              ? "border-gray-800 bg-gray-950 text-gray-300 hover:border-gray-700 hover:bg-gray-800"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <Plus size={17} />
                          Add paragraph
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            addImage(
                              topicIndex
                            )
                          }
                          className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                            darkMode
                              ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                              : "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                          }`}
                        >
                          <ImageIcon size={17} />
                          Add image
                        </button>
                      </div>
                    </div>
                  </section>
                )
              )}

              {/* =================================================
                  ADD TOPIC
              ================================================= */}

              <button
                type="button"
                onClick={addTopic}
                className={`group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed py-6 text-sm font-bold transition ${
                  darkMode
                    ? "border-gray-800 bg-gray-900 text-gray-500 hover:border-indigo-500/50 hover:bg-indigo-500/5 hover:text-indigo-400"
                    : "border-gray-300 bg-white text-gray-500 hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-600"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                    darkMode
                      ? "bg-gray-800 group-hover:bg-indigo-500/10"
                      : "bg-gray-100 group-hover:bg-indigo-100"
                  }`}
                >
                  <Plus size={19} />
                </span>

                Add another topic
              </button>
            </div>

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-5">
                {/* OVERVIEW */}

                <div
                  className={`rounded-2xl border p-5 shadow-sm ${
                    darkMode
                      ? "border-gray-800 bg-gray-900"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="mb-5 flex items-center gap-2">
                    <Eye
                      size={17}
                      className="text-indigo-500"
                    />

                    <h3
                      className={`font-bold ${
                        darkMode
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      Article overview
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <OverviewRow
                      label="Topics"
                      value={topics.length}
                      darkMode={darkMode}
                    />

                    <OverviewRow
                      label="Words"
                      value={wordCount}
                      darkMode={darkMode}
                    />

                    <OverviewRow
                      label="Reading time"
                      value={`${readTime} min`}
                      darkMode={darkMode}
                    />

                    <OverviewRow
                      label="Title"
                      value={
                        title
                          ? "Added"
                          : "Missing"
                      }
                      darkMode={darkMode}
                    />
                  </div>
                </div>

                {/* TIPS */}

                <div
                  className={`rounded-2xl border p-5 ${
                    darkMode
                      ? "border-indigo-500/20 bg-indigo-500/5"
                      : "border-indigo-100 bg-indigo-50"
                  }`}
                >
                  <div className="mb-3 flex items-center gap-2 text-indigo-500">
                    <Sparkles size={17} />

                    <h3 className="font-bold">
                      Writing tips
                    </h3>
                  </div>

                  <ul
                    className={`space-y-3 text-sm leading-6 ${
                      darkMode
                        ? "text-gray-400"
                        : "text-indigo-900/70"
                    }`}
                  >
                    <li>
                      • Use a clear and interesting
                      title.
                    </li>

                    <li>
                      • Break long articles into
                      topics.
                    </li>

                    <li>
                      • Use images to explain
                      important ideas.
                    </li>

                    <li>
                      • Keep paragraphs easy to
                      read.
                    </li>
                  </ul>
                </div>

                {/* STRUCTURE */}

                <div
                  className={`rounded-2xl border p-5 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <Hash
                      size={17}
                      className="text-indigo-500"
                    />

                    <h3
                      className={`font-bold ${
                        darkMode
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      Structure
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {topics.map(
                      (
                        topic,
                        index
                      ) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                            darkMode
                              ? "bg-gray-950"
                              : "bg-gray-50"
                          }`}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-600 text-[11px] font-bold text-white">
                            {index + 1}
                          </span>

                          <span
                            className={`truncate ${
                              topic.topic
                                ? darkMode
                                  ? "text-gray-300"
                                  : "text-gray-700"
                                : "text-gray-600"
                            }`}
                          >
                            {topic.topic ||
                              "Untitled section"}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* =================================================
              PUBLISH BAR
          ================================================= */}

          <div className="sticky bottom-4 z-20 mt-8">
            <div
              className={`rounded-2xl border p-4 shadow-2xl backdrop-blur-xl ${
                darkMode
                  ? "border-gray-800 bg-gray-900/95 shadow-black/40"
                  : "border-gray-200 bg-white/95 shadow-gray-200/70"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* STATS */}

                <div className="flex items-center gap-5">
                  <div
                    className={`flex items-center gap-2 text-sm ${
                      darkMode
                        ? "text-gray-500"
                        : "text-gray-500"
                    }`}
                  >
                    <Clock size={18} />

                    <span className="hidden sm:inline">
                      Reading time:
                    </span>

                    <strong
                      className={
                        darkMode
                          ? "text-gray-200"
                          : "text-gray-900"
                      }
                    >
                      {readTime} min
                    </strong>
                  </div>

                  <div
                    className={`hidden h-5 w-px sm:block ${
                      darkMode
                        ? "bg-gray-800"
                        : "bg-gray-200"
                    }`}
                  />

                  <span
                    className={`hidden text-sm sm:block ${
                      darkMode
                        ? "text-gray-500"
                        : "text-gray-500"
                    }`}
                  >
                    {wordCount} words
                  </span>
                </div>

                {/* PUBLISH */}

                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 ${
                    darkMode
                      ? "shadow-lg shadow-indigo-950/50"
                      : "shadow-lg shadow-indigo-200"
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                      Publishing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={17} />

                      Publish article
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

/* =====================================================
   OVERVIEW ROW
===================================================== */

function OverviewRow({
  label,
  value,
  darkMode,
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span
        className={`font-semibold ${
          darkMode
            ? "text-gray-200"
            : "text-gray-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default CreatePost;