document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Header ---
    const header = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Navigation ---
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const overlay = document.querySelector('.mobile-menu-overlay');

    function toggleMenu() {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('open');
        // Optional: Toggle overlay if you decided to implement it in CSS
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMenu);
    }

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if(navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Intersection Observer for Animations ---
    // Targets: .fade-in, .fade-in-up, .reveal
    const animatedElements = document.querySelectorAll('.reveal, .fade-in, .fade-in-up');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Optional: Stop observing after reveal if you only want it once
                observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px"
    });

    animatedElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Contact Form Handling (WhatsApp) ---
    const contactForm = document.getElementById('inquiryForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const type = document.getElementById('type').value;
            const date = document.getElementById('date').value;
            const message = document.getElementById('message').value;
            
            // Format WhatsApp Message
            // Phone number from user request: 9605888178
            const ownerPhone = '917012046930'; 
            
            const text = `*New Cake Inquiry* 🎂%0A%0A` +
                         `*Name:* ${name}%0A` +
                         `*Email:* ${email}%0A` +
                         `*Type:* ${type}%0A` +
                         `*Event Date:* ${date}%0A` +
                         `*Vision:* ${message}`;
            
            // Format Email Body
            const emailSubject = `New Inquiry from ${name} - Dolli Bakes`;
            const emailBody = `Name: ${name}%0D%0A` +
                              `Email: ${email}%0D%0A` +
                              `Event Type: ${type}%0D%0A` +
                              `Event Date: ${date}%0D%0A` +
                              `Details: ${message}`;
            
            // Placeholder Email - Client to replace
            const ownerEmail = 'murshidmuhammad65@gmail.com'; 

            // Redirect to WhatsApp
            const whatsappUrl = `https://wa.me/${ownerPhone}?text=${text}`;
            window.open(whatsappUrl, '_blank');

            // Trigger Email (Mailto)
            window.location.href = `mailto:${ownerEmail}?subject=${emailSubject}&body=${emailBody}`;
        });
    }
});
