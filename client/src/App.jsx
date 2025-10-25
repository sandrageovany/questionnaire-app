import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Questionnaire from "./pages/Questionnaire";
import Admin from "./pages/Admin";

export default function App() {
  const [message, setMessage] = useState("Loading...");
  const [currentUser, setCurrentUser] = useState(() => {
    // Restore logged-in user from localStorage on reload
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Just for backend check (you can keep or remove)
  useEffect(() => {
    fetch("http://localhost:4000")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("❌ Cannot connect to backend"));
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/questionnaire"
          element={<Questionnaire currentUser={currentUser} />}
        />
        <Route
          path="/admin"
          element={<Admin currentUser={currentUser} />}
        />
      </Routes>
    </Router>
  );
}
