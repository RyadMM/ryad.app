/**
 * ============================================
 * SLIDE NAVIGATION MODULE
 * ============================================
 * Handles keyboard navigation, touch swipe,
 * and slide transitions.
 */

export class SlideNavigation {
    constructor(containerId, onSlideChange) {
        this.container = document.getElementById(containerId);
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.onSlideChange = onSlideChange;

        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
        this.updateSlide();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowRight':
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    this.next();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prev();
                    break;
            }
        });
    }

    setupTouchNavigation() {
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const threshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (diff > threshold) {
            this.next();
        } else if (diff < -threshold) {
            this.prev();
        }
    }

    updateSlide() {
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            if (index === this.currentSlide) {
                slide.classList.add('active');
            } else if (index < this.currentSlide) {
                slide.classList.add('prev');
            }
        });

        if (this.onSlideChange) {
            this.onSlideChange(this.currentSlide, this.totalSlides);
        }
    }

    next() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
            this.updateSlide();
        }
    }

    prev() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateSlide();
        }
    }

    goTo(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.updateSlide();
        }
    }

    getCurrent() {
        return this.currentSlide;
    }

    getTotal() {
        return this.totalSlides;
    }
}
