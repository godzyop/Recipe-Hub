const typewriterText = ["Recipe Hub", "Yummy Food", "Indian Cuisine"];
let textIndex = 0;
let charIndex = 0;
const speed = 150; // Speed of typing in milliseconds

function typeWriter() {
    const span = document.querySelector('.typewriter');
    if (charIndex < typewriterText[textIndex].length) {
        span.textContent += typewriterText[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 2000); // Wait 2 seconds before erasing
    }
}

function eraseText() {
    const span = document.querySelector('.typewriter');
    if (charIndex > 0) {
        span.textContent = typewriterText[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, speed / 2);
    } else {
        textIndex = (textIndex + 1) % typewriterText.length;
        setTimeout(typeWriter, speed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Run typewriter effect only if the element exists on the page
    if (document.querySelector('.typewriter')) {
        typeWriter();
    }

    // Dropdown Menu
    const foodBtn = document.querySelector('.food-btn');
    const dropdown = document.querySelector('.dropdown-content');

    if (foodBtn) { // Check if dropdown exists
        foodBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdown.classList.toggle('show');
        });
    }

    // Close dropdown if clicked outside
    window.addEventListener('click', (event) => {
        if (foodBtn && !foodBtn.contains(event.target)) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    });

    // --- Translation Logic ---
    const langToggleBtn = document.getElementById('lang-toggle');

    function setLanguage(lang) {
        document.querySelectorAll('[data-en]').forEach(el => {
            el.innerText = el.getAttribute(`data-${lang}`);
        });

        // Update typewriter text if it exists
        if (document.querySelector('.typewriter')) {
            const typewriterEl = document.querySelector('.typewriter');
            typewriterEl.setAttribute('data-en', 'Recipe Hub, Yummy Food, Indian Cuisine');
            typewriterEl.setAttribute('data-hi', 'रेसिपी हब, स्वादिष्ट भोजन, भारतीय व्यंजन');
            const texts = typewriterEl.getAttribute(`data-${lang}`).split(', ');
            // This is a simplified update; a full re-initialization of the typewriter would be needed
            // For now, we are focusing on static text.
        }

        langToggleBtn.innerText = lang === 'hi' ? 'English' : 'हिन्दी';
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
    }

    langToggleBtn.addEventListener('click', () => {
        const currentLang = localStorage.getItem('language') || 'en';
        const newLang = currentLang === 'en' ? 'hi' : 'en';
        setLanguage(newLang);
    });

    // On page load, set the language
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
}); 
