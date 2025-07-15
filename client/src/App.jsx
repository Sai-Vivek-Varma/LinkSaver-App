import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Bookmarks from "./pages/Bookmarks";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProctectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/bookmarks" replace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={true}
        closeOnClick
      />
    </Router>
  );
}

export default App;
