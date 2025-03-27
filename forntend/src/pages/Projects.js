import React, { useState, useEffect, useRef } from "react";
import "./Projects.css"; // Import CSS
import { FaGithub } from "react-icons/fa"; // Import GitHub icon

const projects = [
  {
    title: "Netflix Clone",
    description: "A fully responsive Netflix clone built using React and Firebase.",
    github: "https://github.com/kevinshiroya123/netflix-clone",
    liveDemo: "#",
  },
  {
    title: "Airbnb Clone",
    description: "An Airbnb-like platform built with MERN stack.",
    github: "https://github.com/Keta2208/Airbnb-clone",
    liveDemo: "#",
  },
  {
  title: "Create Access",
  description: "A 3D Learning platform built using HTML,CSS, JavaScript and UI/UX princeiples",
  github: "https://github.com/Keta2208/CreateAccess-website",  
  liveDemo: "https://keta2208.github.io/CreateAccess-website", 
},
  {
    title: "AI Video Summarizer",
    description: "An AI-powered tool that automatically generates concise and informative video summaries using advanced NLP techniques.",
    github: "https://github.com/Keta2208/AI-video-summarizer",  
    liveDemo: "#", // No live demo link
    },
  {
    title: "PREPARED Home Safety Advisor",
    description: "A chatbot that offers personalized disaster preparedness recommendations based on location and demographics, starting with LA County and expanding nationwide using Ollama and LLMs.",
    github: "https://github.com/Keta2208/PREPARED-Project",  
    liveDemo: "#", 
  },
  
];

const Projects = () => {
  const projectRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          } else {
            entry.target.classList.remove("fade-in"); // Reset animation when scrolled out
          }
        });
      },
      { threshold: 0.3 }
    );

    projectRefs.current.forEach((project) => {
      if (project) observer.observe(project);
    });

    return () => {
      projectRefs.current.forEach((project) => {
        if (project) observer.unobserve(project);
      });
    };
  }, []);

  return (
    <section className="projects-section">
      <h1 className="projects-title">Projects</h1>
      <h2 className="projects-subtitle">What I Built</h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            ref={(el) => (projectRefs.current[index] = el)}
          >
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-btn">
                  <FaGithub className="github-icon" /> GitHub
                </a>
                {project.liveDemo !== "#" && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="live-demo-btn">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
