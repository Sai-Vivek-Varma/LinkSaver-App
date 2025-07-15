import { Bookmark } from "../models/Bookmark.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateSummary } from "../utils/jinaAI.js";
import { fetchUrlMetadata } from "../utils/urlMetadata.js";

export const getBookmarks = asyncHandler(async (req, res) => {
  const bookmarks = await Bookmark.find({ user: req.user._id }).sort({
    order: 1,
    createdAt: -1,
  });

  return res.apiResponse(bookmarks);
});

export const createBookmark = asyncHandler(async (req, res) => {
  const { url, tags = [] } = req.body;

  if (!url) {
    return res.apiError("URL is required", 400);
  }

  const existingBookmark = await Bookmark.findOne({
    user: req.user._id,
    url,
  });

  if (existingBookmark) {
    return res.apiError("Bookmark already exists", 400);
  }

  const [metadata, summary] = await Promise.all([
    fetchUrlMetadata(url),
    generateSummary(url),
  ]);

  const bookmark = new Bookmark({
    user: req.user._id,
    url: metadata.url,
    title: metadata.title,
    favicon: metadata.favicon,
    summary: summary.summary,
    tags: Array.isArray(tags) ? tags : [],
  });

  await bookmark.save();

  return res.apiResponse(bookmark, "Bookmark created successfully", 201);
});
