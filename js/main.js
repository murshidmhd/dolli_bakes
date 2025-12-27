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

    // --- Flavor Boutique & Gallery Filter Logic ---

    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.bento-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Optional: Add animation class
                    item.animate([
                        { opacity: 0, transform: 'scale(0.9)' },
                        { opacity: 1, transform: 'scale(1)' }
                    ], {
                        duration: 300,
                        easing: 'ease-out'
                    });
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- Wizard Form Logic ---
    const wizardForm = document.getElementById('wizardForm');
    const steps = document.querySelectorAll('.form-step');
    const indicators = document.querySelectorAll('.step-indicator');
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');

    function updateStep(stepIndex) {
        // Hide all steps
        steps.forEach(s => s.classList.remove('active'));
        // Show current step
        steps[stepIndex].classList.add('active');

        // Update indicators
        indicators.forEach((ind, idx) => {
            if (idx <= stepIndex) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
    }

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStepId = btn.getAttribute('data-next'); // e.g., "step-2"
            const stepNum = parseInt(nextStepId.split('-')[1]) - 1; // 0-based index
            
            // Simple validation (can be expanded)
            updateStep(stepNum);
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prevStepId = btn.getAttribute('data-prev');
            const stepNum = parseInt(prevStepId.split('-')[1]) - 1;
            updateStep(stepNum);
        });
    });

    // --- Final Submission (Wizard) ---
    if (wizardForm) {
        wizardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Step 1 Data
            const type = document.getElementById('type').value;
            const date = document.getElementById('date').value;
            const guests = document.getElementById('guests').value;
            
            // Step 2 Data
            const flavor = document.getElementById('flavor').value;
            const message = document.getElementById('message').value;

            // Step 3 Data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // Format WhatsApp Message
            const ownerPhone = '919605888178'; 
            
            const text = `*New Cake Architect Inquiry* 🏗️🎂%0A%0A` +
                         `*Client:* ${name}%0A` +
                         `*Email:* ${email}%0A%0A` +
                         `*--- Event Details ---*%0A` +
                         `*Type:* ${type}%0A` +
                         `*Date:* ${date}%0A` +
                         `*Guests:* ${guests}%0A%0A` +
                         `*--- Cake Design ---*%0A` +
                         `*Flavor:* ${flavor}%0A` +
                         `*Vision:* ${message}`;
            
            // Format Email Body
            const emailSubject = `Cake Architect Inquiry - ${name}`;
            const emailBody = `New Inquiry from Wizard Form%0D%0A%0D%0A` +
                              `Client: ${name} (${email})%0D%0A` +
                              `Event: ${type} on ${date} (Approx ${guests} guests)%0D%0A` +
                              `Preference: ${flavor} flavor%0D%0A` +
                              `Notes: ${message}`;
            
            const ownerEmail = 'dollybakes2017@gmail.com'; 

            // 2. Trigger Email (Small delay to ensure WhatsApp tab opens first)
            setTimeout(() => {
                window.location.href = `mailto:${ownerEmail}?subject=${emailSubject}&body=${emailBody}`;
            }, 1000);
        });
    }

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 800); // Minimum view time
        });
    }
});

// --- Helper for Hero Quick Links ---
function quickFilter(category) {
    // Scroll to gallery
    const gallerySection = document.getElementById('gallery');
    gallerySection.scrollIntoView({ behavior: 'smooth' });

    // Trigger filter click
    // We need to wait for scroll or just trigger it immediately
    setTimeout(() => {
        const btn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        if (btn) {
            btn.click();
        }
    }, 500); // Wait for scroll to start/finish roughly
}