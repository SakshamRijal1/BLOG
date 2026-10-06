const mongoose = require("mongoose");

const contentItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["paragraph", "image"],
      required: true,
    },

    text: {
      type: String,
      default: "",
    },

    url: {
      type: String,
      default: "",
    },

    caption: {
      type: String,
      default: "",
    },
  },
  {
    _id: true,
  }
);

const topicSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: [contentItemSchema],
      required: true,
    },
  },
  {
    _id: true,
  }
);

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    topics: {
      type: [topicSchema],
      required: true,
    },

    readTime: {
      type: Number,
      default: 1,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [commentSchema],

    shares: {
      type: Number,
      default: 0,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);