/**
 * ============================================
 * MAIN APP INITIALIZATION
 * ============================================
 * Bootstraps all modules and sets up the presentation.
 */

import { SlideNavigation } from './navigation.js';
import { FullscreenManager } from './fullscreen.js';
import { UIManager, ScenarioSelector, initCharts } from './ui.js';
import { renderSlides } from './slides.js';

class App {
    constructor() {
        this.navigation = null;
        this.fullscreen = null;
        this.ui = null;
        this.charts = null;
    }

    init() {
        // Render slides first
        renderSlides();

        // Initialize modules
        this.fullscreen = new FullscreenManager();
        this.ui = new UIManager();
        this.charts = initCharts();

        // Initialize navigation with slide change callback
        this.navigation = new SlideNavigation('slidesContainer', (current, total) => {
            this.ui.updateProgress(current, total);
        });

        // Setup scenario selector
        const scenarioSelector = new ScenarioSelector(
            this.charts.contextChartInstance,
            this.charts.dilutionChartInstance
        );

        // Setup fullscreen button
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        fullscreenBtn?.addEventListener('click', () => this.fullscreen.toggle());

        // Setup UI event listeners
        document.addEventListener('ui:prev', () => this.navigation.prev());
        document.addEventListener('ui:next', () => this.navigation.next());
        document.addEventListener('ui:fullscreen', () => this.fullscreen.toggle());

        // Make functions globally available for inline handlers
        window.addContext = (dataset, amount) => this.charts.contextChartInstance.add(dataset, amount);
        window.resetContext = () => this.charts.contextChartInstance.reset();
        window.selectScenario = (scenario) => scenarioSelector.select(scenario);
        window.toggleShortcuts = () => this.ui.toggleShortcuts();

        // Log initialization
        this.logStatus();
    }

    logStatus() {
        console.log('✅ Copilot Context Engineering Presentation initialized');
        console.log('📊 Status:', {
            slidesCount: this.navigation.getTotal(),
            chartsInitialized: 2,
            keyboardNavigation: true,
            fullscreenSupported: document.fullscreenEnabled,
            touchSwipeSupported: 'ontouchstart' in window
        });
        console.log('⌨️ Press ? for keyboard shortcuts');
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
