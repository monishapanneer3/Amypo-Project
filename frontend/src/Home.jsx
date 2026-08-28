import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "antd";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Aggressively redirect unauthenticated sessions back to the Login
  // gateway.
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="home-page">
      <h1>Home</h1>
      <h2
        id="hero-heading-t30"
        style={{
          fontSize: "48px",
          letterSpacing: "1px",
          fontWeight: 800,
          margin: 0,
        }}
      >
        Welcome to EventSphere
      </h2>
      <p className="home-subtitle">
        Manage your conference sessions, speakers, and attendees with ease.
      </p>
      <Link to="/sessions">
        <Button type="primary" size="large">
          Explore
        </Button>
      </Link>
    </div>
  );
};

export default Home;
