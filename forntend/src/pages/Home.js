import React, { useState, useEffect, useRef } from "react";
import "./Home.css"; // Import CSS
import { ReactComponent as DevIllustration } from "../images/illustrator.svg";

// Import Social Media Icons
import githubIcon from "../images/github.png";
import linkedinIcon from "../images/linkedin.png";

// Import Background Images
import dayBackground from "../images/day-home-background.png";
import nightBackground from "../images/night-home-background.png";

const Home = ({ isDarkMode }) => {
  const [typedText, setTypedText] = useState(""); // Stores animated text
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Track visibility
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0); // Track current role
  const devRef = useRef(null); // Reference for scroll animation

  const roles = [
    "Front-End Developer",
    "AI/ML Enginner",
    "UI/UX Designer"
  ];

  const typingSpeed = 150;
  const deletingSpeed = 75;
  const delayBeforeDelete = 2000; // Increased delay to read the text
  const delayBeforeRestart = 500;

  // Typing Animation
  useEffect(() => {
    let typingTimer;
    let currentTextLength = typedText.length;
    const currentRole = roles[currentRoleIndex];

    if (!isDeleting && currentTextLength < currentRole.length) {
      typingTimer = setTimeout(() => {
        setTypedText(currentRole.substring(0, currentTextLength + 1));
      }, typingSpeed);
    } else if (!isDeleting && currentTextLength === currentRole.length) {
      setTimeout(() => setIsDeleting(true), delayBeforeDelete);
    } else if (isDeleting && currentTextLength > 0) {
      typingTimer = setTimeout(() => {
        setTypedText(currentRole.substring(0, currentTextLength - 1));
      }, deletingSpeed);
    } else if (isDeleting && currentTextLength === 0) {
      setTimeout(() => {
        setIsDeleting(false);
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
      }, delayBeforeRestart);
    }

    return () => clearTimeout(typingTimer);
  }, [typedText, isDeleting, currentRoleIndex]);

  // Scroll Animation for Developer SVG
  useEffect(() => {
    const currentRef = devRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of element is visible
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      className={`home-container ${isDarkMode ? "night-mode" : "day-mode"}`}
      style={{ backgroundImage: `url(${isDarkMode ? nightBackground : dayBackground})` }}
    >
      <div className="home-content">
        <h1>Hi, I am <span className="highlight">Keta</span></h1>

        {/* Typing Effect */}
        <h2 className="role">
          {typedText}
          <span className="cursor">|</span> {/* Blinking cursor */}
        </h2>

        <p>
          I am a <strong>Computer Science</strong> student driven by a passion for innovation and technology. Specializing in Front-End Development, AI/ML Engineering, and UI/UX Design, I craft dynamic, intelligent solutions that bridge user experience with cutting-edge technology. Eager to apply my skills to create scalable and impactful projects.
        </p>

        <button
          className="resume-btn"
          onClick={() => window.open(require("../images/Resume.pdf"), "_blank")}
        >
          Resume
        </button>

      </div>

      {/* Right Image - Developer SVG with Scroll Animation */}
      <div className="home-image" ref={devRef}>
        <DevIllustration className={`developer-svg ${isVisible ? "bounce-animate" : ""}`} />
      </div>
    </div>
  );
};

export default Home;
