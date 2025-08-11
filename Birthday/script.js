
// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Fade in animation on scroll
function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#fd79a8'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 100);
    }
}

// Birthday message animation
function showBirthdayMessage() {
    setTimeout(() => {
        console.log('🎉 Happy Birthday! Hope you have an amazing day! 🎂');
    }, 2000);
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Start confetti after a short delay
    setTimeout(createConfetti, 1000);
    
    // Show birthday message
    showBirthdayMessage();
    
    // Handle scroll animations
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Initial check for visible elements
    handleScrollAnimations();
    
    // Create periodic confetti bursts
    setInterval(() => {
        if (Math.random() > 0.7) {
            createConfetti();
        }
    }, 15000);
});

// Add some interactive fun
document.addEventListener('click', function(e) {
    // Create a small burst of confetti on card clicks
    if (e.target.closest('.card')) {
        const rect = e.target.getBoundingClientRect();
        const confettiContainer = document.getElementById('confettiContainer');
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
        
        for (let i = 0; i < 10; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = (rect.left + rect.width/2) + 'px';
            confetti.style.top = (rect.top + rect.height/2) + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 2000);
        }
    }
});

// Add keyboard interaction for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.classList.contains('scroll-btn')) {
        scrollToSection('message');
    }
});

// Console birthday message with ASCII art
console.log(`
🎉🎂🎉🎂🎉🎂🎉🎂🎉🎂🎉🎂🎉
       HAPPY BIRTHDAY!
    Hope you have an amazing day!
🎉🎂🎉🎂🎉🎂🎉🎂🎉🎂🎉🎂🎉
`);
