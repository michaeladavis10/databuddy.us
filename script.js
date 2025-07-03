document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            const isHidden = mobileMenu.style.display === 'none' || mobileMenu.style.display === '';
            mobileMenu.style.display = isHidden ? 'block' : 'none';
        });
    }

    // --- Close Mobile Menu on Link Click ---
    const allNavLinks = document.querySelectorAll('.main-header .nav-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768 && mobileMenu.style.display === 'block') {
                mobileMenu.style.display = 'none';
            }
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('header .nav-link'); // Selects both desktop and mobile links

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60% 0px', // Triggers when a section is in the top 40% of the viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        let visibleSectionId = null;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                visibleSectionId = entry.target.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${visibleSectionId}`) {
                link.classList.add('active');
            }
        });

    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    // --- Case Study Carousel ---
    const track = document.getElementById('case-study-track');
    const leftArrow = document.getElementById('carousel-arrow-left');
    const rightArrow = document.getElementById('carousel-arrow-right');

    if (track && leftArrow && rightArrow) {
        const scrollAmount = () => {
            // Calculate the width of a single card to scroll by
            const card = track.querySelector('.case-study-card');
            if (card) {
                // card width + gap (24px = 1.5rem)
                return card.offsetWidth + 24;
            }
            return 300; // fallback
        };

        rightArrow.addEventListener('click', () => {
            track.scrollBy({
                left: scrollAmount(),
                behavior: 'smooth'
            });
        });

        leftArrow.addEventListener('click', () => {
            track.scrollBy({
                left: -scrollAmount(),
                behavior: 'smooth'
            });
        });
    }

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            // IMPORTANT: Replace 'YOUR_FORM_ID' with your actual Formspree form ID
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: json,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        successMessage.style.display = 'block';
                        contactForm.reset();
                        contactForm.style.display = 'none';
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                alert(data["errors"].map(error => error["message"]).join(", "));
                            } else {
                                alert('Oops! There was a problem submitting your form.');
                            }
                        })
                    }
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    alert('Oops! There was a problem submitting your form.');
                });
        });
    }
});

