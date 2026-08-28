import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { logout } from "../store/slices/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, username } = useSelector((state) => state.auth);

  const handleLogout = () => {
    // Dispatches the flush action which clears redux auth state
    // and removes the persisted token from localStorage.
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="eventsphere-navbar">
      <div className="navbar-inner">
        <span className="navbar-brand">EventSphere</span>
        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "navbar-link" + (isActive ? " active" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/sessions"
            className={({ isActive }) =>
              "navbar-link" + (isActive ? " active" : "")
            }
          >
            Sessions
          </NavLink>
          <NavLink
            to="/speakers"
            className={({ isActive }) =>
              "navbar-link" + (isActive ? " active" : "")
            }
          >
            Speakers
          </NavLink>
          <NavLink
            to="/attendees"
            className={({ isActive }) =>
              "navbar-link" + (isActive ? " active" : "")
            }
          >
            Attendees
          </NavLink>
        </div>
        <div className="navbar-right">
          {isAuthenticated && (
            <>
              <span data-testid="user-status" className="navbar-username">
                Welcome back!{username ? ` ${username}` : ""}
              </span>
              <Button
                danger
                type="primary"
                className="navbar-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
