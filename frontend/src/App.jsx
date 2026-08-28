import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import SessionList from "./components/sessions/SessionList";
import SpeakerList from "./components/speakers/SpeakerList";
import AttendeeList from "./components/attendees/AttendeeList";
import "./App.css";

// Redirects unauthenticated users to the Login gateway before rendering
// protected page content.
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sessions"
            element={
              <ProtectedRoute>
                <SessionList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/speakers"
            element={
              <ProtectedRoute>
                <SpeakerList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendees"
            element={
              <ProtectedRoute>
                <AttendeeList />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
