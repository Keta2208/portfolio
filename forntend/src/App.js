import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import "./App.css"; // Add styling for smooth scrolling

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Update dark mode in localStorage
  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  // Toggle dark mode function
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="sections">
        <section id="home">
          <Home isDarkMode={isDarkMode} />
        </section>
        <section id="about" className="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact" className="contact">
          <Contact />
        </section>
      </div>
    </div>
  );
}

export default App;
