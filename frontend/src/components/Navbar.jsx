import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          TaskManager
        </Link>

        {/* Toggle for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/tasks">
                    ➕ Add Task
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/taskslist">
                    📋 Task List
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    🔑 Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    📝 Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tasks">
                    📝 Add Task
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/taskslist">
                    📝 Task List
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* User Section */}
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="text-white me-3">
                  👋 Hello, <strong>{user.name}</strong>
                </span>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
