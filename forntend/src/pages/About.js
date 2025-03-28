import React, { useState, useEffect, useRef } from "react";
import "./About.css"; // Import styles

const technologies = [
  { className: "devicon-c-plain colored", name: "C Language" },
  { className: "devicon-python-plain colored", name: "Python" },
  { className: "devicon-tensorflow-original colored", name: "TensorFlow" },
  { className: "devicon-pytorch-original colored", name: "PyTorch" },
  { className: "devicon-jupyter-plain colored", name: "Scikit-learn" },
  { className: "devicon-pandas-original-wordmark colored", name: "Pandas" },
  { className: "devicon-numpy-original-wordmark colored", name: "NumPy" },
  { className: "devicon-typescript-plain colored", name: "TypeScript" },
  { className: "devicon-express-original colored", name: "Express" },
  { className: "devicon-nodejs-plain colored", name: "NodeJS" },
  { className: "devicon-flutter-plain colored", name: "Flutter" },
  { className: "devicon-react-original colored", name: "React Native" },
  { className: "devicon-html5-plain colored", name: "HTML" },
  { className: "devicon-css3-plain colored", name: "CSS" },
  { className: "devicon-bootstrap-plain colored", name: "Bootstrap" },
  { className: "devicon-redux-original colored", name: "Redux" },
  { className: "devicon-sass-original colored", name: "Sass" },
  { className: "devicon-javascript-plain colored", name: "JavaScript" },
  { className: "devicon-tailwindcss-plain colored", name: "Tailwind CSS" },
  { className: "devicon-react-original colored", name: "React" },
];

const About = () => {
  const [visibleTech, setVisibleTech] = useState({});
  const techRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleTech((prev) => ({
              ...prev,
              [entry.target.dataset.index]: true,
            }));
          } else {
            setVisibleTech((prev) => ({
              ...prev,
              [entry.target.dataset.index]: false,
            }));
          }
        });
      },
      { threshold: 0.3 } // Adjust to trigger animation when 30% visible
    );

    techRefs.current.forEach((tech) => {
      if (tech) observer.observe(tech);
    });

    return () => {
      techRefs.current.forEach((tech) => {
        if (tech) observer.unobserve(tech);
      });
    };
  }, []);

  return (
    <section className="about-section">
      <h1 className="about-title">About Me</h1>
      
      <div className="about-content">
        <h2 className="about-subtitle">A bit about me</h2>
        <p className="about-description">
                  I am a driven and innovative computer science student with expertise in machine learning,
                  AI, and frontend development. My passion lies in transforming complex challenges into impactful,
                  scalable solutions. From conceptualizing cutting-edge AI tools to optimizing system performance,
                  I focus on crafting high-performance, user-centric software that addresses real-world problems.
                  With a deep commitment to blending technology, design, and functionality, I take pride in bringing
                  projects from idea to release. Currently, I am expanding my skill set in Buisness intelligence and
                  Machine learning, always eager to push the boundaries of what technology can achieve.
        </p>
      </div>

      <div className="technologies-section">
        <h2 className="about-subtitle">Technology Stack</h2>
        <p className="about-description">
          Using a combination of cutting-edge technologies and reliable open-source software, I build user-focused, 
          performant projects and websites.
        </p>
        <div className="technologies-grid">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={`tech-item ${visibleTech[index] ? "bounce-in" : ""}`}
              data-index={index}
              ref={(el) => (techRefs.current[index] = el)}
            >
              <i className={`${tech.className} tech-icon`}></i>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
