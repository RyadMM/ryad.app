/**
 * ============================================
 * CHARTS MODULE
 * ============================================
 * Chart.js configurations for context window
 * and dilution visualizations.
 */

export class ContextChart {
    constructor(canvasId) {
        this.ctx = document.getElementById(canvasId).getContext('2d');
        this.data = { system: 10, code: 0, files: 0, chat: 0 };
        this.chart = null;

        this.init();
    }

    init() {
        this.chart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: ['Fenêtre'],
                datasets: [
                    {
                        label: 'System',
                        data: [this.data.system],
                        backgroundColor: '#3f3f46'
                    },
                    {
                        label: 'Code Actif',
                        data: [this.data.code],
                        backgroundColor: '#6366f1'
                    },
                    {
                        label: 'Fichiers',
                        data: [this.data.files],
                        backgroundColor: '#60a5fa'
                    },
                    {
                        label: 'Chat',
                        data: [this.data.chat],
                        backgroundColor: '#a78bfa'
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        max: 100,
                        grid: { color: '#27272a' },
                        ticks: { color: '#71717a' }
                    },
                    y: { stacked: true, display: false }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#a1a1aa', boxWidth: 12, padding: 15 }
                    }
                }
            }
        });
    }

    add(datasetIndex, amount) {
        const datasets = this.chart.data.datasets;
        const total = datasets.reduce((sum, d) => sum + d.data[0], 0);

        if (total + amount > 100) {
            // Simulate FIFO - reduce oldest user data first
            if (datasets[3].data[0] > 0) {
                datasets[3].data[0] = Math.max(0, datasets[3].data[0] - (total + amount - 100));
            }
            if (datasets[2].data[0] > 0 && total + amount - 100 > 0) {
                datasets[2].data[0] = Math.max(0, datasets[2].data[0] - (total + amount - 100));
            }
        }

        datasets[datasetIndex].data[0] = Math.min(100, datasets[datasetIndex].data[0] + amount);
        this.chart.update();

        return this.getStatus();
    }

    reset() {
        this.chart.data.datasets.forEach((ds, i) => {
            ds.data[0] = i === 0 ? 10 : 0;
        });
        this.chart.update();
        return this.getStatus();
    }

    getStatus() {
        const total = this.chart.data.datasets.reduce((sum, d) => sum + d.data[0], 0);

        if (total > 90) {
            return {
                text: '⚠️ DANGER : Contexte saturé. L\'IA oublie le début.',
                className: 'text-red-400'
            };
        } else if (total > 60) {
            return {
                text: 'Note : Fenêtre bien remplie.',
                className: 'text-yellow-400'
            };
        } else {
            return {
                text: 'État : Optimal. Espace disponible.',
                className: 'text-emerald-400'
            };
        }
    }
}

export class DilutionChart {
    constructor(canvasId) {
        this.ctx = document.getElementById(canvasId).getContext('2d');
        this.data = {
            clean: [90, 85, 95],
            noise: [30, 40, 50]
        };
        this.currentScenario = 'clean';
        this.chart = null;

        this.init();
    }

    init() {
        this.chart = new Chart(this.ctx, {
            type: 'radar',
            data: {
                labels: ['Pertinence', 'Précision', 'Stabilité'],
                datasets: [{
                    data: this.data.clean,
                    fill: true,
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: '#10b981',
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#10b981'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: '#27272a' },
                        grid: { color: '#27272a' },
                        pointLabels: { color: '#a1a1aa' },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: { display: false }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    setScenario(scenario) {
        this.currentScenario = scenario;
        const dataset = this.chart.data.datasets[0];

        if (scenario === 'clean') {
            dataset.data = this.data.clean;
            dataset.backgroundColor = 'rgba(16, 185, 129, 0.2)';
            dataset.borderColor = '#10b981';
            dataset.pointBackgroundColor = '#10b981';
        } else {
            dataset.data = this.data.noise;
            dataset.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            dataset.borderColor = '#ef4444';
            dataset.pointBackgroundColor = '#ef4444';
        }

        this.chart.update();
    }

    getResultMessage(scenario) {
        if (scenario === 'clean') {
            return {
                text: '<strong>Résultat :</strong> Copilot comprend exactement ce que vous voulez. Le code généré utilise les bonnes variables et respecte le style.',
                className: 'bg-emerald-900/20 text-emerald-400'
            };
        } else {
            return {
                text: '<strong>Résultat :</strong> Copilot est confus. Il invente des fonctions ou utilise des patterns de vieux fichiers ouverts.',
                className: 'bg-red-900/20 text-red-400'
            };
        }
    }
}
