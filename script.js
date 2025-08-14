//navbar.js
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const navbar = document.querySelector(".navbar");

// Toggle menu burger
menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("show");
    menuToggle.classList.toggle("active");
});

// Tutup menu saat klik di luar
document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove("show");
        menuToggle.classList.remove("active");
    }
});

// Tutup menu saat link diklik
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        menuToggle.classList.remove("active");
    });
});

// Scroll effect untuk navbar
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Active link highlighting
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Prevent body scroll when menu is open
menuToggle.addEventListener("click", () => {
    if (navMenu.classList.contains("show")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        document.body.style.overflow = "";
    });
});

