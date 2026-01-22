/**
 * ============================================
 * FULLSCREEN MODULE
 * ============================================
 * Handles fullscreen toggle mode for presentations.
 */

export class FullscreenManager {
    constructor() {
        this.isFullscreen = false;
        this.init();
    }

    init() {
        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', () => {
            this.isFullscreen = !!document.fullscreenElement;
            this.updateUI();
        });

        // Escape key handling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.fullscreenElement) {
                document.exitFullscreen();
            }
        });
    }

    toggle() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            document.body.classList.add('fullscreen-mode');
        } else {
            document.exitFullscreen();
            document.body.classList.remove('fullscreen-mode');
        }
    }

    enter() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        }
    }

    exit() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

    updateUI() {
        if (!this.isFullscreen) {
            document.body.classList.remove('fullscreen-mode');
        }
    }

    isActive() {
        return this.isFullscreen;
    }
}
