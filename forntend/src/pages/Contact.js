import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";

const Contact = () => {
  const contactRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Intersection Observer for Animation
  useEffect(() => {
    const currentRef = contactRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.remove("animate");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Handle Form Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(""); // Reset error message when user updates input
  };

  // Handle Form Submission (Sends Data to Custom Backend API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccessMessage("Message Sent Successfully! 🎉");
      setFormData({ name: "", email: "", message: "" }); // Reset Form
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" ref={contactRef}>
      <h1 className="contact-title">Contact</h1>

      <div className="contact-container">
        {/* Left Section - Contact Form */}
        <div className="contact-form">
          <h2 className="contact-subtitle">Connect with me</h2>
          <p className="contact-description">
            Want to discuss something or just say hello? Feel free to reach out. I'd love to hear from you!
          </p>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />

            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Enter your message" required></textarea>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <a href="mailto:k.patel010@umb.edu" className="email-direct">
            Send me an email directly
          </a>
        </div>

        {/* Right Section - Contact Info */}
        <div className="contact-info">
          <div className="contact-item">
            <h3>Contact Information</h3>
            <address>
              <p>50 Island View Place</p>
              <p>Boston, MA 02125</p>
              <p>Phone: <a href="tel:+17825799432">(781) 579-9432</a></p>
              <p>Email: <a href="mailto:patelketa22@gmail.com">patelketa222gmail.com</a></p>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
