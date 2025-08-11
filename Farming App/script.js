// Crop database with conditions and suitability
const cropDatabase = {
  rice: {
    ph: { min: 5.5, max: 7.0 },
    weather: ['rainy', 'humid'],
    soil: ['clay', 'loamy'],
    suitability: 'excellent'
  },
  wheat: {
    ph: { min: 6.0, max: 7.5 },
    weather: ['sunny', 'dry'],
    soil: ['loamy', 'sandy'],
    suitability: 'good'
  },
  corn: {
    ph: { min: 6.0, max: 6.8 },
    weather: ['sunny', 'cloudy'],
    soil: ['loamy', 'silty'],
    suitability: 'excellent'
  },
  tomato: {
    ph: { min: 6.0, max: 7.0 },
    weather: ['sunny', 'cloudy'],
    soil: ['loamy', 'sandy'],
    suitability: 'good'
  },
  potato: {
    ph: { min: 5.0, max: 6.5 },
    weather: ['cloudy', 'humid'],
    soil: ['sandy', 'loamy'],
    suitability: 'excellent'
  },
  soybean: {
    ph: { min: 6.0, max: 7.0 },
    weather: ['humid', 'rainy'],
    soil: ['loamy', 'clay'],
    suitability: 'good'
  },
  cotton: {
    ph: { min: 5.5, max: 8.0 },
    weather: ['sunny', 'dry'],
    soil: ['sandy', 'loamy'],
    suitability: 'good'
  },
  barley: {
    ph: { min: 6.5, max: 7.5 },
    weather: ['dry', 'windy'],
    soil: ['loamy', 'clay'],
    suitability: 'good'
  },
  onion: {
    ph: { min: 6.0, max: 7.0 },
    weather: ['dry', 'sunny'],
    soil: ['sandy', 'loamy'],
    suitability: 'excellent'
  },
  carrot: {
    ph: { min: 6.0, max: 7.0 },
    weather: ['cloudy', 'humid'],
    soil: ['sandy', 'loamy'],
    suitability: 'good'
  },
  lettuce: {
    ph: { min: 6.0, max: 7.0 },
    weather: ['cloudy', 'humid'],
    soil: ['loamy', 'silty'],
    suitability: 'excellent'
  },
  beans: {
    ph: { min: 6.0, max: 7.5 },
    weather: ['sunny', 'cloudy'],
    soil: ['loamy', 'sandy'],
    suitability: 'good'
  }
};

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  // Navigation click handler
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      navigateToSection(targetId);
    });
  });

  // Hamburger menu toggle
  hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
   
    // Animate hamburger bars
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
      bar.style.transform = navMenu.classList.contains('active')
        ? `rotate(${index === 0 ? 45 : index === 2 ? -45 : 0}deg) translate(${index === 1 ? '10px' : '0'}, ${index === 1 ? '0' : index === 0 ? '6px' : '-6px'})`
        : 'none';
      bar.style.opacity = navMenu.classList.contains('active') && index === 1 ? '0' : '1';
    });
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const bars = document.querySelectorAll('.bar');
      bars.forEach(bar => {
        bar.style.transform = 'none';
        bar.style.opacity = '1';
      });
    });
  });

  // Crop form submission
  const cropForm = document.getElementById('cropForm');
  cropForm.addEventListener('submit', handleCropFormSubmission);

  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', handleContactFormSubmission);

  // Add smooth scrolling animation to floating cards
  animateFloatingCards();
});

// Navigation function
function navigateToSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
 
  // Hide all sections
  sections.forEach(section => {
    section.classList.remove('active');
  });
 
  // Remove active class from all nav links
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
 
  // Show target section with animation
  setTimeout(() => {
    const targetSection = document.getElementById(sectionId);
    const targetNavLink = document.querySelector(`[href="#${sectionId}"]`);
   
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.classList.add('page-transition');
     
      // Remove transition class after animation
      setTimeout(() => {
        targetSection.classList.remove('page-transition');
      }, 500);
    }
   
    if (targetNavLink) {
      targetNavLink.classList.add('active');
    }
  }, 100);
}

// Crop form submission handler
function handleCropFormSubmission(e) {
  e.preventDefault();
 
  const soilPh = parseFloat(document.getElementById('soilPh').value);
  const weather = document.getElementById('weather').value;
  const soilType = document.getElementById('soilType').value;
 
  // Show loading spinner
  showLoadingSpinner();
 
  // Simulate API call delay
  setTimeout(() => {
    const suggestions = getCropSuggestions(soilPh, weather, soilType);
    displayCropSuggestions(suggestions);
  }, 2000);
}

// Show loading spinner
function showLoadingSpinner() {
  document.getElementById('loadingSpinner').classList.remove('hidden');
  document.getElementById('suggestions').classList.add('hidden');
}

// Get crop suggestions based on input
function getCropSuggestions(ph, weather, soilType) {
  const suggestions = [];
 
  Object.keys(cropDatabase).forEach(crop => {
    const cropData = cropDatabase[crop];
    let score = 0;
   
    // Check pH compatibility
    if (ph >= cropData.ph.min && ph <= cropData.ph.max) {
      score += 40;
    } else if (Math.abs(ph - cropData.ph.min) <= 0.5 || Math.abs(ph - cropData.ph.max) <= 0.5) {
      score += 20;
    }
   
    // Check weather compatibility
    if (cropData.weather.includes(weather)) {
      score += 35;
    }
   
    // Check soil type compatibility
    if (cropData.soil.includes(soilType)) {
      score += 25;
    }
   
    // Only include crops with reasonable compatibility
    if (score >= 50) {
      let suitability = 'poor';
      if (score >= 90) suitability = 'excellent';
      else if (score >= 70) suitability = 'good';
      else if (score >= 50) suitability = 'fair';
     
      suggestions.push({
        name: crop,
        score: score,
        suitability: suitability,
        reasons: getCropReasons(crop, ph, weather, soilType)
      });
    }
  });
 
  // Sort by score (highest first)
  return suggestions.sort((a, b) => b.score - a.score);
}

// Get reasons for crop recommendation
function getCropReasons(crop, ph, weather, soilType) {
  const reasons = [];
  const cropData = cropDatabase[crop];
 
  if (ph >= cropData.ph.min && ph <= cropData.ph.max) {
    reasons.push(`Optimal pH range (${cropData.ph.min}-${cropData.ph.max})`);
  }
 
  if (cropData.weather.includes(weather)) {
    reasons.push(`Suitable for ${weather} conditions`);
  }
 
  if (cropData.soil.includes(soilType)) {
    reasons.push(`Thrives in ${soilType} soil`);
  }
 
  return reasons;
}

// Display crop suggestions
function displayCropSuggestions(suggestions) {
  document.getElementById('loadingSpinner').classList.add('hidden');
 
  const suggestionsContainer = document.getElementById('suggestions');
  const cropResults = document.getElementById('cropResults');
 
  if (suggestions.length === 0) {
    cropResults.innerHTML = `
      <div class="crop-item" style="background: linear-gradient(135deg, #ff6b6b, #ee5a52);">
        <h4>🚫 No Suitable Crops Found</h4>
        <p>The current conditions may not be ideal for common crops. Consider adjusting soil pH or exploring specialized varieties.</p>
      </div>
    `;
  } else {
    cropResults.innerHTML = suggestions.map((crop, index) => `
      <div class="crop-item" style="animation-delay: ${index * 0.1}s;">
        <h4>🌱 ${crop.name.charAt(0).toUpperCase() + crop.name.slice(1)}</h4>
        <div class="suitability">${crop.suitability} match (${crop.score}% compatibility)</div>
        <p><strong>Why it's suitable:</strong> ${crop.reasons.join(', ')}</p>
      </div>
    `).join('');
  }
 
  suggestionsContainer.classList.remove('hidden');
}

// Contact form submission handler
function handleContactFormSubmission(e) {
  e.preventDefault();
 
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
 
  // Simulate form submission
  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
 
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
 
  setTimeout(() => {
    alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you at ${email} soon.`);
    e.target.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 1500);
}

// Animate floating cards
function animateFloatingCards() {
  const cards = document.querySelectorAll('.floating-card');
 
  cards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.05)';
    });
   
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Add scroll-triggered animations
function addScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });
 
  document.querySelectorAll('.resource-card, .floating-card').forEach(el => {
    observer.observe(el);
  });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effects to buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
   
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
 
  // Add click animation to CTA button
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  }
});

// Add typing effect for hero title
function addTypingEffect() {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
   
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
   
    // Start typing effect after page loads
    setTimeout(typeWriter, 500);
  }
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
  // Only add typing effect on first load
  if (document.getElementById('home').classList.contains('active')) {
    addTypingEffect();
  }
});

// Add smooth hover effects for navigation
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
 
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
   
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Export for global access
window.navigateToSection = navigateToSection;