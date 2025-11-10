/**
 * Stream-Voice-Anon Demo Page - Main JavaScript
 * Handles interactivity and user interactions
 */

// Copy Citation to Clipboard
function copyCitation() {
    const citationText = `@inproceedings{streamvoiceanon2024,
  title={Stream-Voice-Anon: Enhancing Utility of Real-Time Speaker Anonymization via Neural Audio Codec and Language Models},
  author={Your Name and Co-Authors},
  booktitle={Proceedings of Interspeech 2024},
  year={2024},
  organization={ISCA}
}`;

    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(citationText)
            .then(() => {
                showCopyFeedback(true);
            })
            .catch(err => {
                console.error('Failed to copy citation:', err);
                fallbackCopy(citationText);
            });
    } else {
        // Fallback for older browsers
        fallbackCopy(citationText);
    }
}

// Fallback copy method for older browsers
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        showCopyFeedback(successful);
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showCopyFeedback(false);
    }

    document.body.removeChild(textArea);
}

// Show visual feedback after copying
function showCopyFeedback(success) {
    const button = document.querySelector('.btn-primary[onclick="copyCitation()"]');
    if (!button) return;

    const originalText = button.innerHTML;

    if (success) {
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = '#2ECC71';
    } else {
        button.innerHTML = '<i class="fas fa-times"></i> Failed to copy';
        button.style.background = '#E74C3C';
    }

    // Reset button after 2 seconds
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 2000);
}

// Smooth scrolling for anchor links (progressive enhancement)
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links with hash
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle internal hash links
            if (href === '#' || href === '#top') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lazy load audio files for better performance
    const audioElements = document.querySelectorAll('audio[preload="metadata"]');
    audioElements.forEach(audio => {
        // Only load when user is about to interact
        audio.addEventListener('play', function() {
            if (!this.hasAttribute('data-loaded')) {
                this.load();
                this.setAttribute('data-loaded', 'true');
            }
        }, { once: true });
    });

    // Add keyboard navigation for audio players
    audioElements.forEach(audio => {
        audio.addEventListener('keydown', function(e) {
            // Space bar to play/pause
            if (e.code === 'Space' && e.target.tagName === 'AUDIO') {
                e.preventDefault();
                if (this.paused) {
                    this.play();
                } else {
                    this.pause();
                }
            }
        });
    });

    // Add aria-live region for screen readers when audio state changes
    audioElements.forEach(audio => {
        audio.addEventListener('play', function() {
            announceToScreenReader('Audio playing');
        });
        audio.addEventListener('pause', function() {
            announceToScreenReader('Audio paused');
        });
        audio.addEventListener('ended', function() {
            announceToScreenReader('Audio ended');
        });
    });
});

// Announce to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Optional: Add animation on scroll for cards and sections
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and audio items for fade-in animation
    document.addEventListener('DOMContentLoaded', function() {
        const elementsToAnimate = document.querySelectorAll('.card, .audio-item, .contribution-card');

        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    });
}

// Handle error loading audio files
document.addEventListener('DOMContentLoaded', function() {
    const audioElements = document.querySelectorAll('audio');

    audioElements.forEach(audio => {
        audio.addEventListener('error', function(e) {
            const container = this.closest('.audio-item');
            if (container) {
                const errorMsg = document.createElement('p');
                errorMsg.style.color = '#E74C3C';
                errorMsg.style.fontSize = '0.85rem';
                errorMsg.style.marginTop = '0.5rem';
                errorMsg.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Audio file not found. Please ensure audio files are in the correct directory.';

                // Only add error message if not already present
                if (!container.querySelector('.audio-error')) {
                    errorMsg.classList.add('audio-error');
                    this.parentNode.appendChild(errorMsg);
                }
            }
            console.error('Error loading audio:', this.src);
        });
    });
});

// Add functionality to highlight table rows on hover for better readability
document.addEventListener('DOMContentLoaded', function() {
    const tables = document.querySelectorAll('table');

    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.2s ease';
            });
        });
    });
});

// Console message for developers
console.log('%cStream-Voice-Anon Demo', 'font-size: 20px; font-weight: bold; color: #4A90E2;');
console.log('%cFor more information, visit the GitHub repository', 'font-size: 12px; color: #5A6C7D;');
