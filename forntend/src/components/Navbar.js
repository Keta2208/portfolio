import React, { useState, useEffect } from "react";
import "../components/Navbar.css"; 

import dayIcon from "../images/day-toggle-icon.png";
import nightIcon from "../images/night-toggle-icon.png";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [rotate, setRotate] = useState(false);
  
  useEffect(() => {
    let scrollTimeout;
  
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide when scrolling down
      } else {
        setIsVisible(true); // Show when scrolling up
      }
      setLastScrollY(window.scrollY);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 500);
    };

    // Show navbar when the mouse reaches the top
    const handleMouseMove = (e) => {
      if (e.clientY < 10) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(scrollTimeout);
    };
  }, [lastScrollY]);

  const handleToggle = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 500);
    toggleTheme();
  };

  return (
    <nav className={`navbar ${isVisible ? "visible" : "hidden"}`}>
      <div className="navbar-logo">
        <span>Keta.</span>
      </div>

      <div className="menu-theme-container">
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {["home", "about", "projects", "contact"].map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`nav-link ${activeSection === `#${id}` ? "active" : ""}`}
                onClick={() => {
                  setActiveSection(`#${id}`);
                  setMenuOpen(false);
                }}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <div className="theme-toggle" onClick={handleToggle}>
          <img
            src={isDarkMode ? nightIcon : dayIcon}
            alt="Toggle Theme"
            className={`toggle-icon ${rotate ? "rotate" : ""}`}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
