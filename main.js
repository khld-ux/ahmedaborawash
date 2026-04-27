document.addEventListener('DOMContentLoaded', function () {
    console.log('🎉 High End Clinic Loaded Successfully!');

    initLoader();
    initNavbar();
    // initHeroAnimations(); // Disabled per request
    // initScrollAnimations(); // Disabled per request
    // initServiceCards(); // Disabled tilt movement per request
    initGalleryTilt();
    initContactForm();
    initParticles();
    initDoctorImage();
    initCounterAnimation();
    // initTypingEffect(); // Disabled per request
});

function initLoader() {
    const loader = document.getElementById('loader');

    if (loader) {
        // Only run on pages with a loader (homepage)
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2000);
    }

    // AOS initialization disabled per request to remove animations
    /*
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
    */

    // Preload images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.src;
        const preloadImg = new Image();
        preloadImg.src = src;
    });
}

function initNavbar() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const menu = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    
    if (menu && navLinks) {
        menu.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
        });
    }

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove("active");
        });
    });

    // Close menu when clicking outside (on the site)
    document.addEventListener('click', (e) => {
        if (navLinks && menu && navLinks.classList.contains("active") &&
            !menu.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove("active");
        }
    });
}

// Hero animations disabled
function initHeroAnimations() { }

// Scroll animations disabled
function initScrollAnimations() {
    // We still keep the 'animate' class logic but without the reveal effect if needed, 
    // or just let things be visible immediately. 
    // To be safe, we'll just make everything visible via CSS or remove the observer.
    document.querySelectorAll('.service-card, .about-text, .about-image, .contact-info, .contact-form').forEach(el => {
        el.classList.add('animate'); // Make them visible immediately
    });
}

function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

function initGalleryTilt() { }

function initContactForm() {
    const form = document.querySelector('.premium-form');
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
            btn.innerHTML = "جاري الإرسال...";
            btn.disabled = true;
        }

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            if (res.ok) {
                // Redirect to Thank You page
                window.location.href = 'thankyou.html';
            } else {
                alert("حصل خطأ في الإرسال، يرجى المحاولة مرة أخرى");
            }
        } catch (err) {
            alert("مشكلة في الاتصال، يرجى التحقق من الإنترنت");
        } finally {
            if (btn) {
                btn.innerHTML = "إرسال";
                btn.disabled = false;
            }
        }
    });
}

function initParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 8000);
    }
    setInterval(createParticle, 1000);
}

function initDoctorImage() {
    const doctorImg = document.getElementById('doctor-img');
    if (!doctorImg) return;
    const imageContainer = doctorImg.closest('.image-container');
    if (!imageContainer) return;

    imageContainer.addEventListener('mousemove', (e) => {
        const rect = imageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        doctorImg.style.transform = `translate(${x / 20}px, ${y / 20}px) scale(1.05)`;
    });

    imageContainer.addEventListener('mouseleave', () => {
        doctorImg.style.transform = 'translate(0, 0) scale(1)';
    });
}

function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                observer.unobserve(entry.target);
            }
        });
    });

    const aboutSection = document.getElementById('about');
    if (aboutSection) observer.observe(aboutSection);
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    if (isNaN(target)) return;
    const increment = target / 50;
    let current = 0;
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + '+';
        }
    };
    updateCounter();
}

// Typing effect disabled
function initTypingEffect() {
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        title.style.opacity = '1';
    });
}

// Global Cursor
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});