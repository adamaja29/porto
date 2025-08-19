// navbar.js - Optimized version
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const navbar = document.querySelector(".navbar");

// Fungsi untuk toggle menu
function toggleMenu() {
    const isOpen = navMenu.classList.contains("show");
    navMenu.classList.toggle("show");
    menuToggle.classList.toggle("active");
    document.body.style.overflow = isOpen ? "" : "hidden";
}

// Fungsi untuk close menu
function closeMenu() {
    navMenu.classList.remove("show");
    menuToggle.classList.remove("active");
    document.body.style.overflow = "";
}

// Event listeners
menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
});

document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
    }
});

// Gabungkan semua event listener untuk navLinks
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Close menu
        closeMenu();
        
        // Active link highlighting
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        
        // Smooth scrolling dengan offset navbar
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            const navbarHeight = navbar.offsetHeight || 60;
            const targetPosition = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Scroll effect untuk navbar
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Hero section fade effect on scroll
window.addEventListener("scroll", function () {
    const heroSection = document.querySelector(".hero");
    if (!heroSection) return;
    
    const scrollY = window.scrollY;
    const fadeStart = 0;
    const fadeEnd = 400;
    
    let opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
    opacity = Math.max(0, Math.min(1, opacity));
    
    heroSection.style.opacity = opacity;
});

// Animasi slide-in/out untuk about image dengan arah scroll
const aboutImage = document.querySelector('.about-img');
let lastScrollY = window.scrollY;

const observerOptions = {
    threshold: [0, 0.5, 0.7, 0.9, 1],
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY;
        
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            entry.target.classList.add('animate');
            entry.target.classList.remove('hidden');
        } else if (!isScrollingDown && entry.intersectionRatio < 0.1) {
            entry.target.classList.remove('animate');
            entry.target.classList.add('hidden');
        }
        
        lastScrollY = currentScrollY;
    });
}, observerOptions);

if (aboutImage) {
    observer.observe(aboutImage);
}

// Scroll animations for timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
console.log("Timeline items found:", timelineItems.length); // Log jumlah elemen timeline

let lastScrollYTimeline = window.scrollY;

const timelineObserverOptions = {
    threshold: [0, 0.5, 0.7, 0.9, 1],
    rootMargin: '0px'
};

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        console.log("Entry:", entry); // Log setiap entry yang terdeteksi
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollYTimeline;
        
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            entry.target.classList.add('animate-in');
            entry.target.classList.remove('animate-out');
            console.log("Animating in:", entry.target); // Log elemen yang dianimasikan
        } else {
            entry.target.classList.add('animate-out');
            entry.target.classList.remove('animate-in');
            console.log("Animating out:", entry.target); // Log elemen yang dianimasikan keluar
        }
        
        lastScrollYTimeline = currentScrollY;
    });
}, timelineObserverOptions);

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Update scroll positions
window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    lastScrollYTimeline = window.scrollY;
}, { passive: true });
