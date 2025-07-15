// Simplified Bookmarks Page - Just the essentials
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/bookmarks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setBookmarks(data.data || []);
        }
      } catch (error) {
        console.error("Fetch bookmarks error:", error);
        toast.error("Failed to load bookmarks");
      }
    };

    fetchBookmarks();
  }, []);

  // Add bookmark
  const handleAddBookmark = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/v1/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        setBookmarks((prev) => [data.data, ...prev]);
        setUrl("");
        toast.success("Bookmark added!");
      } else {
        throw new Error(data.message || "Failed to add bookmark");
      }
    } catch (error) {
      console.error("Add bookmark error:", error);
      toast.error(error.message || "Failed to add bookmark");
    } finally {
      setLoading(false);
    }
  };

  // Delete bookmark
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/bookmarks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setBookmarks((prev) => prev.filter((bookmark) => bookmark._id !== id));
      toast.success("Bookmark deleted!");
    } catch (error) {
      console.error("Delete bookmark error:", error);
      toast.error("Failed to delete bookmark");
    }
  }; // Filter by tags
  const filteredBookmarks = selectedTag
    ? bookmarks.filter((bookmark) => bookmark.tags?.includes(selectedTag))
    : bookmarks;

  // Get all unique tags
  const allTags = [
    ...new Set(bookmarks.flatMap((bookmark) => bookmark.tags || [])),
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Bookmarks</h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        {/* Simple Add Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Save a Bookmark</h2>
          <form onSubmit={handleAddBookmark} className="flex gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste any URL..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Filter by Tags:
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag("")}
                className={`px-3 py-1 rounded-full text-sm ${
                  !selectedTag
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTag === tag
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bookmarks List */}
        <div className="space-y-4">
          {filteredBookmarks.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">
                No bookmarks yet. Add your first one above!
              </p>
            </div>
          ) : (
            filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark._id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {/* Favicon */}
                    {bookmark.favicon && (
                      <img
                        src={bookmark.favicon}
                        alt=""
                        className="w-6 h-6 mt-1 flex-shrink-0"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    )}

                    <div className="flex-1">
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {bookmark.title || bookmark.url}
                      </h3>

                      {/* URL */}
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm block mb-2"
                      >
                        {bookmark.url}
                      </a>

                      {/* Summary */}
                      {bookmark.summary && (
                        <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                          {bookmark.summary}
                        </p>
                      )}

                      {/* Tags */}
                      {bookmark.tags && bookmark.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {bookmark.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(bookmark._id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
