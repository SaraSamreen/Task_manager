import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  // Animation effect when component mounts
  useEffect(() => {
    const container = document.querySelector(".home-container");
    container.classList.add("fade-in");

    // Initialize the staggered animations for children
    const elements = document.querySelectorAll(".animate-in");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, 300 + index * 200);
    });
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="animate-in">
          Task<span className="accent">FLOW</span>
        </h1>
        <p className="animate-in">Your simple and effective task organizer.</p>

        <div className="features animate-in">
          <div className="feature">
            <span className="feature-icon">✓</span>
            <span>Easy Organization</span>
          </div>
          <div className="feature">
            <span className="feature-icon">⏱</span>
            <span>Time Management</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <span>Progress Tracking</span>
          </div>
        </div>

        <div className="home-buttons animate-in">
          <Link to="/login" className="btn btn-primary">
            Log In
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>

      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
}

export default Home;
