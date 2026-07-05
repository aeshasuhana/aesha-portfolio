// ================= MOBILE NAV =================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu when a nav link is clicked on mobile
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// ================= TYPING EFFECT =================
const typingText = document.getElementById("typing-text");

const roles = [
  "Aspiring Software Developer",
  "UI/UX & Web Design Enthusiast",
  "AI & Machine Learning Student",
  "ERP Internship Trainee"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 45 : 85);
}

typeEffect();

// ================= THEME TOGGLE =================
const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    formStatus.textContent = "Sending...";
    formStatus.style.color = "#555";

    const formData = new FormData(contactForm);

    try {
      const response = await fetch("https://formspree.io/f/mbdvwpod", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        formStatus.textContent = "Message sent successfully!";
        formStatus.style.color = "green";
        contactForm.reset();
      } else {
        formStatus.textContent =
          result?.errors?.[0]?.message || "Failed to send message. Please try again.";
        formStatus.style.color = "red";
      }
    } catch (error) {
      formStatus.textContent = "Something went wrong. Please check your internet or Formspree setup.";
      formStatus.style.color = "red";
      console.error("Form submission error:", error);
    }
  });
}