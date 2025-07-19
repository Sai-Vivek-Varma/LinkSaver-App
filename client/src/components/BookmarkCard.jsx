import { toast } from "react-toastify";

const BookmarkCard = ({ bookmark, darkMode, onDelete, index }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/bookmarks/${bookmark._id}`,
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

      onDelete(bookmark._id);
      toast.success("Bookmark deleted");
    } catch (error) {
      console.error("Delete bookmark error:", error);
      toast.error("Failed to delete bookmark");
    }
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
          : "bg-white border-gray-200 hover:bg-gray-50"
      } rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl hover:scale-[1.02] p-6`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1 min-w-0">
          <div className="flex-shrink-0 mt-1">
            {bookmark.favicon ? (
              <img
                src={bookmark.favicon}
                alt=""
                className="w-8 h-8 rounded-lg shadow-sm"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ display: bookmark.favicon ? "none" : "flex" }}
            >
              {bookmark.title ? bookmark.title.charAt(0).toUpperCase() : "🔗"}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold mb-2 leading-tight break-words">
              {bookmark.title || bookmark.url}
            </h3>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 text-sm block mb-3 hover:underline break-all"
            >
              {bookmark.url}
            </a>
            {bookmark.summary && (
              <div
                className={`${
                  darkMode
                    ? "bg-gray-900 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                } border rounded-xl p-4 mb-4`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-blue-500">
                    AI Summary
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed break-words ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {bookmark.summary}
                </p>
              </div>
            )}
            {bookmark.tags && bookmark.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {bookmark.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-3 rounded-xl transition-all duration-200 ml-4 group"
          title="Delete bookmark"
        >
          <svg
            className="w-5 h-5 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;
