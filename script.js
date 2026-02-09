// ===== GLOBAL VARIABLES =====
let currentPage = window.location.pathname.split("/").pop() || "index.html";

// ===== LOADING SCREEN =====
window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingScreen = document.querySelector(".loading-screen");
    if (loadingScreen) {
      loadingScreen.classList.add("hidden");
    }
  }, 1000);
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link");

function toggleMenu() {
  hamburger?.classList.toggle("active");
  nav?.classList.toggle("active");
  document.body.style.overflow = nav?.classList.contains("active")
    ? "hidden"
    : "";
}

hamburger?.addEventListener("click", toggleMenu);

// Close menu when clicking on nav links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (nav?.classList.contains("active")) {
      toggleMenu();
    }
  });
});

// ===== STICKY HEADER =====
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header?.classList.add("scrolled");
  } else {
    header?.classList.remove("scrolled");
  }
});

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
function setActiveNavLink() {
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href === currentPage ||
      (currentPage === "" && href === "index.html") ||
      (currentPage === "index.html" && href === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = header?.offsetHeight || 80;
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const fadeElements = document.querySelectorAll(".fade-in");

function checkScroll() {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkScroll);
window.addEventListener("load", checkScroll);

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn?.classList.add("visible");
  } else {
    backToTopBtn?.classList.remove("visible");
  }
});

backToTopBtn?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===== FORM VALIDATION =====
function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll("[required]");

  requiredFields.forEach((field) => {
    const errorElement = field.parentElement.querySelector(".error-message");

    if (!field.value.trim()) {
      showError(field, errorElement, "This field is required");
      isValid = false;
    } else if (field.type === "email" && !isValidEmail(field.value)) {
      showError(field, errorElement, "Please enter a valid email address");
      isValid = false;
    } else if (field.type === "tel" && !isValidPhone(field.value)) {
      showError(field, errorElement, "Please enter a valid phone number");
      isValid = false;
    } else {
      clearError(field, errorElement);
    }
  });

  return isValid;
}

function showError(field, errorElement, message) {
  field.classList.add("error");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }
}

function clearError(field, errorElement) {
  field.classList.remove("error");
  if (errorElement) {
    errorElement.classList.remove("show");
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
}

// ===== LAZY LOADING =====
const lazyImages = document.querySelectorAll("img[data-src]");
const lazyVideos = document.querySelectorAll("video[data-src]");

function lazyLoad() {
  lazyImages.forEach((img) => {
    if (img.getBoundingClientRect().top < window.innerHeight + 100) {
      img.src = img.dataset.src;
      img.classList.remove("lazy");
    }
  });

  lazyVideos.forEach((video) => {
    if (video.getBoundingClientRect().top < window.innerHeight + 100) {
      video.src = video.dataset.src;
      video.load();
      video.classList.remove("lazy");
    }
  });
}

// ===== MODAL FUNCTIONALITY =====
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Close modal when clicking outside content
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal.id);
    }
  });
});

// ===== NEWSLETTER SUBSCRIPTION =====
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector('input[type="email"]');

  if (email && isValidEmail(email.value)) {
    // In a real application, you would send this to your server
    alert("Thank you for subscribing to our newsletter!");
    form.reset();
  } else {
    alert("Please enter a valid email address.");
  }
}

// ===== QUOTE REQUEST MODAL =====
function handleQuoteSubmit(e) {
  e.preventDefault();
  const form = e.target;

  if (validateForm(form)) {
    // In a real application, you would send this data to your server
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("Quote Request Submitted:", data);
    alert("Thank you for your quote request! We will contact you shortly.");

    form.reset();
    closeModal("quoteModal");
  }
}

// ===== INITIALIZE =====
document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink();
  lazyLoad();

  // Initialize lazy loading
  window.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);

  // Initialize form submissions
  const contactForm = document.getElementById("contactForm");
  const quoteForm = document.getElementById("quoteForm");
  const newsletterForm = document.getElementById("newsletterForm");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm(contactForm)) {
      // Handle form submission
      alert("Thank you for your message! We will contact you soon.");
      contactForm.reset();
    }
  });

  quoteForm?.addEventListener("submit", handleQuoteSubmit);
  newsletterForm?.addEventListener("submit", handleNewsletterSubmit);

  // Initialize modal close buttons
  document.querySelectorAll(".modal-close").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      if (modal) {
        closeModal(modal.id);
      }
    });
  });

  // Initialize quote request buttons
  document.querySelectorAll(".request-quote-btn").forEach((button) => {
    button.addEventListener("click", () => {
      openModal("quoteModal");
    });
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.active").forEach((modal) => {
        closeModal(modal.id);
      });
    }
  });
});

// ===== GOOGLE MAPS INTEGRATION =====
function initMap() {
  // Accra, Ghana coordinates
  const accra = { lat: 5.6037, lng: -0.187 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: accra,
    styles: [
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{ color: "#1B5E20" }],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
    ],
  });

  const marker = new google.maps.Marker({
    position: accra,
    map: map,
    title: "NecsTrade Headquarters",
    icon: {
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231B5E20'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z'/%3E%3C/svg%3E",
      scaledSize: new google.maps.Size(40, 40),
    },
  });

  const infowindow = new google.maps.InfoWindow({
    content:
      "<strong>NecsTrade</strong><br>Agricultural Commodity Trading<br>Accra, Ghana",
  });

  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 200; // The lower the slower

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    updateCount();
  });
}

// ===== INITIALIZE COUNTERS WHEN VISIBLE =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".stats-grid").forEach((grid) => {
  observer.observe(grid);
});
// Add to your existing script.js file

// Hero scroll indicator functionality
const scrollIndicator = document.querySelector(".hero-scroll-indicator");
if (scrollIndicator) {
  scrollIndicator.addEventListener("click", () => {
    const nextSection = document.querySelector(".section");
    if (nextSection) {
      const headerHeight =
        document.querySelector(".header")?.offsetHeight || 80;
      const targetPosition = nextSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
}

// Video fallback functionality
document.addEventListener("DOMContentLoaded", () => {
  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo) {
    // Check if video can play
    heroVideo.addEventListener("error", () => {
      console.log("Video failed to load, using fallback image");
      // The fallback image will automatically show from the img tag inside video
    });

    // Try to play video
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Video autoplay prevented:", error);
        // Show play button or handle accordingly
      });
    }
  }
});
