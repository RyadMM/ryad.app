/**
 * ============================================
 * UI MODULE
 * ============================================
 * Progress bar, shortcuts modal, and UI updates.
 */

export class UIManager {
    constructor() {
        this.progressBar = document.getElementById('progressBar');
        this.slideIndicator = document.getElementById('slideIndicator');
        this.shortcutsModal = document.getElementById('shortcutsModal');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');

        this.init();
    }

    init() {
        // Setup button listeners
        this.prevBtn?.addEventListener('click', () => this.emit('prev'));
        this.nextBtn?.addEventListener('click', () => this.emit('next'));

        // Setup shortcuts modal
        this.shortcutsModal?.addEventListener('click', (e) => {
            if (e.target.id === 'shortcutsModal') {
                this.toggleShortcuts();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'f' || e.key === 'F') {
                e.preventDefault();
                this.emit('fullscreen');
            }
            if (e.key === '?') {
                e.preventDefault();
                this.toggleShortcuts();
            }
            if (e.key === 'Escape') {
                if (this.shortcutsModal?.classList.contains('show')) {
                    this.toggleShortcuts();
                }
            }
        });
    }

    // Simple event emitter
    emit(eventName) {
        const event = new CustomEvent(`ui:${eventName}`);
        document.dispatchEvent(event);
    }

    updateProgress(current, total) {
        const progress = ((current + 1) / total) * 100;
        if (this.progressBar) {
            this.progressBar.style.width = progress + '%';
        }
        if (this.slideIndicator) {
            this.slideIndicator.textContent = `${current + 1} / ${total}`;
        }
    }

    toggleShortcuts() {
        this.shortcutsModal?.classList.toggle('show');
    }

    showShortcuts() {
        this.shortcutsModal?.classList.add('show');
    }

    hideShortcuts() {
        this.shortcutsModal?.classList.remove('show');
    }
}

export class ScenarioSelector {
    constructor(contextChart, dilutionChart) {
        this.contextChart = contextChart;
        this.dilutionChart = dilutionChart;
        this.currentScenario = 'clean';

        this.init();
    }

    init() {
        // Setup scenario cards
        const cleanCard = document.getElementById('scenarioClean');
        const noiseCard = document.getElementById('scenarioNoise');

        cleanCard?.addEventListener('click', () => this.select('clean'));
        noiseCard?.addEventListener('click', () => this.select('noise'));
    }

    select(scenario) {
        this.currentScenario = scenario;

        // Update cards visual state
        const cleanCard = document.getElementById('scenarioClean');
        const noiseCard = document.getElementById('scenarioNoise');

        if (scenario === 'clean') {
            cleanCard?.classList.add('selected');
            noiseCard?.classList.remove('selected');
        } else {
            noiseCard?.classList.add('selected');
            cleanCard?.classList.remove('selected');
        }

        // Update chart
        this.dilutionChart.setScenario(scenario);

        // Update message
        const messageEl = document.getElementById('dilutionMessage');
        const result = this.dilutionChart.getResultMessage(scenario);
        if (messageEl) {
            messageEl.innerHTML = result.text;
            messageEl.className = `mt-4 p-3 ${result.className} rounded-lg text-sm text-center`;
        }
    }
}

// Global functions for inline onclick handlers
let contextChartInstance = null;
let dilutionChartInstance = null;

export function initCharts() {
    contextChartInstance = new ContextChart('contextChart');
    dilutionChartInstance = new DilutionChart('dilutionChart');
    return { contextChartInstance, dilutionChartInstance };
}

export function addContext(dataset, amount) {
    if (contextChartInstance) {
        const status = contextChartInstance.add(dataset, amount);
        updateContextStatus(status);
    }
}

export function resetContext() {
    if (contextChartInstance) {
        const status = contextChartInstance.reset();
        updateContextStatus(status);
    }
}

export function updateContextStatus(status) {
    const statusEl = document.getElementById('contextStatus');
    if (statusEl) {
        statusEl.textContent = status.text;
        statusEl.className = `text-center text-sm mt-4 mono ${status.className}`;
    }
}

export function selectScenario(scenario) {
    const selector = new ScenarioSelector(contextChartInstance, dilutionChartInstance);
    selector.select(scenario);
}
