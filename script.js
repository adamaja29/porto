//navbar.js
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

// Toggle menu burger
menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });
});

window.addEventListener("scroll", () => {
    document.querySelector(".navbar").classList.toggle("scrolled", window.scrollY > 50);
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

// Scroll Effect for Hero Image
const heroImg = document.getElementById("hero-img");
const aboutSection = document.getElementById("about");
const aboutImgContainer = document.createElement('div');
aboutImgContainer.className = 'about-img-container';
aboutImgContainer.innerHTML = '<img src="assets/adam.jpg" alt="foto">';
aboutSection.appendChild(aboutImgContainer);

// Scroll effect variables
let lastScrollY = window.scrollY;
let heroImgVisible = true;
let aboutImgVisible = false;

// Smooth scroll effect
function handleScrollEffect() {
    const scrollY = window.scrollY;
    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection.offsetHeight;
    const aboutTop = aboutSection.offsetTop;
    const aboutHeight = aboutSection.offsetHeight;
    
    // Hero image fade out effect
    if (scrollY < heroHeight * 0.8) {
        const fadeProgress = scrollY / (heroHeight * 0.8);
        heroImg.style.opacity = Math.max(0, 1 - fadeProgress);
        heroImg.style.transform = `translateY(${scrollY * 0.3}px) scale(${1 - fadeProgress * 0.2})`;
    } else {
        heroImg.style.opacity = 0;
        heroImg.style.transform = 'translateY(100px) scale(0.8)';
    }
    
    // About image fade in effect
    const aboutProgress = (scrollY - aboutTop + window.innerHeight * 0.5) / (aboutHeight * 0.5);
    if (scrollY > aboutTop - window.innerHeight * 0.5 && scrollY < aboutTop + aboutHeight) {
        const fadeInProgress = Math.max(0, Math.min(1, aboutProgress));
        aboutImgContainer.style.opacity = fadeInProgress;
        aboutImgContainer.style.transform = `translateY(-50%) scale(${0.8 + fadeInProgress * 0.2})`;
        aboutImgContainer.classList.add('show');
    } else {
        aboutImgContainer.style.opacity = 0;
        aboutImgContainer.classList.remove('show');
    }
}

// Throttle scroll events for performance
let ticking = false;
function updateScrollEffect() {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScrollEffect();
            ticking = false;
        });
        ticking = true;
    }
}

// Initialize and add event listeners
window.addEventListener('scroll', updateScrollEffect);
window.addEventListener('load', handleScrollEffect);

