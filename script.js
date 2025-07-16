function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Carousel functionality
let currentSlideIndex = 0;
const totalSlides = 3;

function showSlide(index) {
  const wrapper = document.getElementById('carousel-wrapper');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  // Ensure index is within bounds
  if (index >= totalSlides) {
    currentSlideIndex = 0;
  } else if (index < 0) {
    currentSlideIndex = totalSlides - 1;
  } else {
    currentSlideIndex = index;
  }
  
  // Move carousel wrapper
  wrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  
  // Update indicators
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === currentSlideIndex);
  });
  
  // Update navigation buttons
  prevBtn.disabled = currentSlideIndex === 0;
  nextBtn.disabled = currentSlideIndex === totalSlides - 1;
}

function changeSlide(direction) {
  showSlide(currentSlideIndex + direction);
}

function currentSlide(index) {
  showSlide(index - 1);
}

// Auto-play functionality (optional)
let autoPlayInterval;

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    if (currentSlideIndex < totalSlides - 1) {
      changeSlide(1);
    } else {
      showSlide(0);
    }
  }, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
  showSlide(0);
  
  // Pause auto-play on hover (if enabled)
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
  }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 50;
  const swipeDistance = touchStartX - touchEndX;
  
  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      // Swiped left - next slide
      changeSlide(1);
    } else {
      // Swiped right - previous slide
      changeSlide(-1);
    }
  }
}

// Add touch event listeners
document.addEventListener('DOMContentLoaded', function() {
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', handleTouchStart);
    carouselContainer.addEventListener('touchend', handleTouchEnd);
  }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') {
    changeSlide(-1);
  } else if (e.key === 'ArrowRight') {
    changeSlide(1);
  }
});