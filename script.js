// Intro animations
window.addEventListener("load", () => {
    const intro = document.getElementById("intro");
    const site = document.getElementById("real-site");

    // Intro elements fade in
    const leftSection = intro.querySelector('.left');
    const rightSection = intro.querySelector('.flex-1:last-child');

    if (leftSection) {
        leftSection.style.opacity = '0';
        leftSection.style.transform = 'translateX(-30px)';
        setTimeout(() => {
            leftSection.style.transition = 'all 0.8s ease';
            leftSection.style.opacity = '1';
            leftSection.style.transform = 'translateX(0)';
        }, 300);
    }

    if (rightSection) {
        rightSection.style.opacity = '0';
        rightSection.style.transform = 'translateX(30px)';
        setTimeout(() => {
            rightSection.style.transition = 'all 0.8s ease';
            rightSection.style.opacity = '1';
            rightSection.style.transform = 'translateX(0)';
        }, 600);
    }

    // Hide intro after delay
    setTimeout(() => {
        intro.classList.add("smooth-out");
        setTimeout(() => {
            intro.style.display = "none";
            site.style.display = "block";
            initAllAnimations();
        }, 1200);
    }, 3500);
});

function initAllAnimations() {
    initRevealAnimations();
    initSlideAnimations();
    initNavigation();
    initSkillBars();
}

// Reveal animations for sections
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
}

// Slide animations
function initSlideAnimations() {
    const slides = document.querySelectorAll('.slide-in-left, .slide-in-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    slides.forEach(el => observer.observe(el));
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('#skills .group .h-full');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width || entry.target.className.match(/w-\[(\d+)%\]/)?.[1] + '%';
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.transition = 'width 1.5s ease';
                    entry.target.style.width = width;
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(el => observer.observe(el));
}

// Navigation
function initNavigation() {
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-item");

    // Scroll spy
    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active", "bg-primary/25", "shadow-glow");
            const icon = item.querySelector("i");
            const span = item.querySelector("span");

            if (icon) icon.classList.replace("text-white", "text-primary");
            if (span) span.classList.replace("text-white", "text-gray-400");

            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active", "bg-primary/25", "shadow-glow");
                if (icon) icon.classList.replace("text-primary", "text-white");
                if (span) span.classList.replace("text-gray-400", "text-white");
            }
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            if (href === "#") return;

            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });
}

// Back to top
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Contact form
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerHTML = '<i class="fas fa-check mr-2"></i> Sent!';
            btn.classList.add('bg-green-500');
            setTimeout(() => {
                btn.innerHTML = 'Send Message';
                btn.classList.remove('bg-green-500');
                form.reset();
            }, 2000);
        });
    }
});
