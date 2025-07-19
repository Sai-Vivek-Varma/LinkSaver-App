import BookmarkCard from "./BookmarkCard";

const BookmarksList = ({ bookmarks, darkMode, onDelete }) => {
  if (bookmarks.length === 0) {
    return (
      <div
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } rounded-2xl shadow-lg border p-12 text-center`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full">
            <svg
              className="w-12 h-12 text-white"
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
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">No bookmarks yet</h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Start building your collection by adding your first bookmark
              above!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookmarks.map((bookmark, index) => (
        <BookmarkCard
          key={bookmark._id}
          bookmark={bookmark}
          darkMode={darkMode}
          onDelete={onDelete}
          index={index}
        />
      ))}
    </div>
  );
};

export default BookmarksList;
