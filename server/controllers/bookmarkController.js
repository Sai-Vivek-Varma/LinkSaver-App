import { Bookmark } from "../models/Bookmark.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import { generateSummary } from "../utils/jinaAI.js";
import { fetchUrlMetadata } from "../utils/urlMetadata.js";

export const getBookmarks = asyncHandler(async (req, res) => {
  const bookmarks = await Bookmark.find({ user: req.user._id }).sort({
    order: 1,
    createdAt: -1,
  });

  return res.apiResponse(bookmarks);
});

export const createBookmark = asyncHandler(async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.apiError("URL is required", 400);
  }
  let normalizedUrl = url.trim();
  if (
    !normalizedUrl.startsWith("http://") &&
    !normalizedUrl.startsWith("https://")
  ) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  const existingBookmark = await Bookmark.findOne({
    user: req.user._id,
    url: normalizedUrl,
  });
  if (existingBookmark) {
    return res.apiError("Bookmark already exists", 400);
  }

  // const [metadataResult, summaryResult] = await Promise.all([
  //   fetchUrlMetadata(normalizedUrl),
  //   generateSummary(normalizedUrl),
  // ]);

  const metadataResult = await fetchUrlMetadata(normalizedUrl);

  console.log("Metadata result:", metadataResult);
  // console.log("Summary result:", summaryResult);

  if (!metadataResult || !metadataResult.success) {
    return res.apiError(
      "Could not access the website. Please check the URL and try again",
      400
    );
  }

  const bookmark = new Bookmark({
    user: req.user._id,
    url: metadataResult?.url || normalizedUrl,
    title: metadataResult?.title || normalizedUrl,
    favicon: metadataResult?.favicon || "",
    // summary: summaryResult?.summary || "Summary not available",
    summary: "AI summary coming soon",
  });

  await bookmark.save();
  return res.apiResponse(bookmark, "Bookmark created successfully", 201);
});

export const deleteBookmark = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.apiError("Bookmark ID is required", 400);
  }

  const bookmark = await Bookmark.findByIdAndDelete(id);
  if (!bookmark) {
    return res.apiError("Bookmark not found", 404);
  }

  return res.apiResponse(null, "Bookmark deleted successfully");
});
