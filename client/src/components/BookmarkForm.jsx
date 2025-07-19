import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookmarkForm = ({ darkMode, onBookmarkAdded }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddBookmark = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/bookmarks`,
        {
          url: url.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Server response:", response.data);

      if (response.data.success && response.data.data) {
        onBookmarkAdded(response.data.data);
        setUrl("");
        toast.success("Bookmark saved successfully");
      }
    } catch (error) {
      console.error("Add bookmark error:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } rounded-2xl shadow-xl border p-6 mb-8`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold">Save New Bookmark</h2>
      </div>

      <form
        onSubmit={handleAddBookmark}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste any URL here... (e.g., www.example.com)"
            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <span>Save Bookmark</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BookmarkForm;
