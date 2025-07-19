import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Header from "../components/Header";
import BookmarkForm from "../components/BookmarkForm";
import BookmarksList from "../components/BookmarksList";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/bookmarks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Fetch response:", response.data);
      if (response.data.success) {
        setBookmarks(response.data.data || []);
      }
    } catch (error) {
      console.error("Fetch bookmarks error:", error);
      toast.error("Failed to load bookmarks");
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleBookmarkAdded = (newBookmark) => {
    setBookmarks((prev) => [newBookmark, ...prev]);
  };

  const handleBookmarkDelete = (bookmarkId) => {
    setBookmarks((prev) =>
      prev.filter((bookmark) => bookmark._id !== bookmarkId)
    );
  };

  const themeClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-50 text-gray-900";

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <BookmarkForm
          darkMode={darkMode}
          onBookmarkAdded={handleBookmarkAdded}
        />

        <BookmarksList
          bookmarks={bookmarks}
          darkMode={darkMode}
          onDelete={handleBookmarkDelete}
        />

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"></div>
      </div>
    </div>
  );
};

export default Bookmarks;
