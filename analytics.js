// Google Analytics Event Tracking for Portfolio
// Add this to your script.js file or create a new analytics.js file

// Helper function to send events to GA4
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, eventParams);
      console.log('GA Event:', eventName, eventParams); // For debugging
    }
  }
  
  // 1. NAVIGATION TRACKING
  document.addEventListener('DOMContentLoaded', function() {
    
    // Track navigation link clicks (both desktop and mobile)
    const navLinks = document.querySelectorAll('.nav-links a, .menu-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const section = this.getAttribute('href').replace('#', '');
        trackEvent('navigation_click', {
          section_name: section,
          link_text: this.textContent,
          nav_type: this.closest('#desktop-nav') ? 'desktop' : 'mobile'
        });
      });
    });
  
    // Track hamburger menu toggle
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    if (hamburgerIcon) {
      hamburgerIcon.addEventListener('click', function() {
        const isOpen = document.querySelector('.menu-links').classList.contains('open');
        trackEvent('hamburger_menu_toggle', {
          action: isOpen ? 'close' : 'open'
        });
      });
    }
  
    // 2. PROFILE SECTION TRACKING
    
    // Track CV download
    const cvButton = document.querySelector('.btn-color-2');
    if (cvButton && cvButton.textContent.includes('Download CV')) {
      cvButton.addEventListener('click', function() {
        trackEvent('cv_download', {
          button_location: 'profile_section'
        });
      });
    }
  
    // Track Contact Info button
    const contactButton = document.querySelector('.btn-color-1');
    if (contactButton && contactButton.textContent.includes('Contact')) {
      contactButton.addEventListener('click', function() {
        trackEvent('contact_button_click', {
          button_location: 'profile_section'
        });
      });
    }
  
    // Track social media clicks
    const socialIcons = document.querySelectorAll('#socials-container .icon');
    socialIcons.forEach(icon => {
      icon.addEventListener('click', function() {
        const platform = this.alt.includes('LinkedIn') ? 'LinkedIn' : 'Github';
        trackEvent('social_media_click', {
          platform: platform,
          section: 'profile'
        });
      });
    });
  
    // 3. TIMELINE SECTION TRACKING
    
    // Track timeline item views (using Intersection Observer)
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const title = entry.target.querySelector('.timeline-title').textContent.trim();
          trackEvent('timeline_item_view', {
            item_title: title.substring(0, 50) // Limit length
          });
          timelineObserver.unobserve(entry.target); // Only track once
        }
      });
    }, { threshold: 0.5 });
  
    timelineItems.forEach(item => timelineObserver.observe(item));
  
    // 4. PROJECTS SECTION TRACKING
    
    // Track carousel navigation
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        trackEvent('carousel_navigation', {
          direction: 'previous'
        });
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        trackEvent('carousel_navigation', {
          direction: 'next'
        });
      });
    }
  
    // Track carousel indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
        trackEvent('carousel_indicator_click', {
          slide_number: index + 1
        });
      });
    });
  
    // Track project button clicks
    const projectButtons = document.querySelectorAll('.project-btn');
    projectButtons.forEach(button => {
      button.addEventListener('click', function() {
        const projectTitle = this.closest('.project-container').querySelector('.project-title').textContent;
        const buttonText = this.textContent;
        trackEvent('project_button_click', {
          project_name: projectTitle,
          button_type: buttonText,
          button_url: this.getAttribute('onclick')?.match(/https?:\/\/[^\s'"]+/)?.[0] || 'unknown'
        });
      });
    });
  
    // Track Tableau dashboard interaction
    const tableauContainer = document.querySelector('.tableau-embed-container');
    if (tableauContainer) {
      tableauContainer.addEventListener('click', function() {
        trackEvent('tableau_dashboard_interaction', {
          interaction_type: 'click'
        });
      });
    }
  
    // 5. ANALYTICS SECTION TRACKING
    
    // Track Looker Studio dashboard view
    const dashboardIframe = document.querySelector('.dashboard-iframe');
    if (dashboardIframe) {
      const dashboardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            trackEvent('analytics_dashboard_view', {
              dashboard_type: 'looker_studio'
            });
            dashboardObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      
      dashboardObserver.observe(dashboardIframe);
    }
  
    // 6. EXPERIENCE SECTION TRACKING
    
    // Track when users view experience details
    const experienceContainers = document.querySelectorAll('.details-container');
    const experienceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const title = entry.target.querySelector('.experience-sub-title')?.textContent;
          if (title) {
            trackEvent('experience_section_view', {
              section_type: title
            });
            experienceObserver.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.5 });
  
    experienceContainers.forEach(container => experienceObserver.observe(container));
  
    // 7. CONTACT SECTION TRACKING
    
    // Track email clicks
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
      emailLink.addEventListener('click', function() {
        trackEvent('contact_method_click', {
          method: 'email',
          email: this.textContent
        });
      });
    }
  
    // Track LinkedIn contact clicks
    const linkedinContactLink = document.querySelector('.contact-info-container a[href*="linkedin"]');
    if (linkedinContactLink) {
      linkedinContactLink.addEventListener('click', function() {
        trackEvent('contact_method_click', {
          method: 'linkedin'
        });
      });
    }
  
    // 8. FOOTER TRACKING
    
    const footerLinks = document.querySelectorAll('footer .nav-links a');
    footerLinks.forEach(link => {
      link.addEventListener('click', function() {
        const section = this.getAttribute('href').replace('#', '');
        trackEvent('footer_navigation_click', {
          section_name: section
        });
      });
    });
  
    // 9. SCROLL DEPTH TRACKING
    
    let maxScrollDepth = 0;
    const scrollMilestones = [25, 50, 75, 90, 100];
    const trackedMilestones = new Set();
  
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
  
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        scrollMilestones.forEach(milestone => {
          if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
            trackedMilestones.add(milestone);
            trackEvent('scroll_depth', {
              depth_percentage: milestone
            });
          }
        });
      }
    });
  
    // 10. TIME ON PAGE TRACKING
    
    let timeOnPage = 0;
    setInterval(() => {
      timeOnPage += 30;
      if (timeOnPage % 60 === 0) { // Track every minute
        trackEvent('time_on_page', {
          seconds: timeOnPage,
          minutes: timeOnPage / 60
        });
      }
    }, 30000); // Check every 30 seconds
  
    // 11. SECTION VISIBILITY TRACKING
    
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackEvent('section_view', {
            section_id: entry.target.id,
            section_name: entry.target.querySelector('.title')?.textContent || entry.target.id
          });
        }
      });
    }, { threshold: 0.3 });
  
    sections.forEach(section => sectionObserver.observe(section));
  
    // 12. ARROW NAVIGATION TRACKING
    
    const arrowIcons = document.querySelectorAll('.arrow');
    arrowIcons.forEach(arrow => {
      arrow.addEventListener('click', function() {
        const targetSection = this.getAttribute('onclick')?.match(/#([^']+)/)?.[1];
        trackEvent('arrow_navigation_click', {
          target_section: targetSection
        });
      });
    });
  
    // 13. PAGE EXIT INTENT
    
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') {
        trackEvent('page_exit', {
          time_spent: timeOnPage,
          max_scroll_depth: maxScrollDepth
        });
      }
    });
  
  });
  
  // 14. EXTERNAL LINK TRACKING (for any external links added later)
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.hostname !== window.location.hostname && link.href) {
      trackEvent('external_link_click', {
        url: link.href,
        link_text: link.textContent
      });
    }
  });