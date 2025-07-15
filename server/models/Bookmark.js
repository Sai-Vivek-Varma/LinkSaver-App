import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    url: {
      type: String,
      required: [true, "URL is required"],
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    favicon: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

schema.index({ user: 1, createdAt: -1 });
schema.index({ user: 1, tags: 1 });

export const Bookmark = model("Bookmark", schema);
