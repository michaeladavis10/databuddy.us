// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Simple form submission handler (client-side only for this static site)
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent actual form submission

    // In a real scenario, you'd send this data to a backend (e.g., Netlify Forms, Formspree, custom API)
    console.log('Form submitted (client-side only):');
    console.log('Name:', document.getElementById('name').value);
    console.log('Email:', document.getElementById('email').value);
    console.log('Message:', document.getElementById('message').value);

    // Display success message and clear form
    contactForm.reset();
    successMessage.style.display = 'block';

    // Hide success message after a few seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
});

// Carousel Controls
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('case-study-track');
    const leftArrow = document.getElementById('carousel-arrow-left');
    const rightArrow = document.getElementById('carousel-arrow-right');

    if (track && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            const cardWidth = track.querySelector('.case-study-card').offsetWidth;
            track.scrollBy({ left: -cardWidth - 24, behavior: 'smooth' }); // 24px is 1.5rem gap
        });

        rightArrow.addEventListener('click', () => {
            const cardWidth = track.querySelector('.case-study-card').offsetWidth;
            track.scrollBy({ left: cardWidth + 24, behavior: 'smooth' }); // 24px is 1.5rem gap
        });
    }
});