// Gestion des statistiques et graphiques
class StatisticsManager {
    constructor() {
        this.data = {
            etablissements: {
                'Écoles Primaires': 850,
                'Collèges': 300,
                'Lycées': 80,
                'Autres': 20
            },
            scolarisation: {
                'Maevatanana': 85,
                'Kandreho': 78,
                'Tsaratanana': 72,
                'Befandriana': 68
            },
            performance: {
                '2019': 65,
                '2020': 67,
                '2021': 70,
                '2022': 72,
                '2023': 75,
                '2024': 85,
                '2025': 90
            }
        };
        
        this.init();
    }
    
    init() {
        this.createEtablissementsChart();
        this.createScolarisationChart();
        this.createPerformanceChart();
        this.initDataUpdates();
    }
    
    // Graphique des établissements
    createEtablissementsChart() {
        const container = document.getElementById('etablissementsChart');
        if (!container) return;
        
        const data = this.data.etablissements;
        const maxValue = Math.max(...Object.values(data));
        
        container.innerHTML = '';
        
        Object.entries(data).forEach(([label, value]) => {
            const percentage = (value / maxValue) * 100;
            const bar = this.createBarElement(label, value, percentage);
            container.appendChild(bar);
        });
    }
    
    // Graphique de scolarisation
    createScolarisationChart() {
        const container = document.getElementById('scolarisationChart');
        if (!container) return;
        
        const data = this.data.scolarisation;
        
        container.innerHTML = '';
        
        Object.entries(data).forEach(([district, taux]) => {
            const bar = this.createBarElement(district, taux + '%', taux);
            container.appendChild(bar);
        });
    }
    
    // Graphique de performance (pour extension future)
    createPerformanceChart() {
        // Peut être utilisé pour un troisième graphique
        console.log('Performance data loaded:', this.data.performance);
    }
    
    // Créer un élément de barre
    createBarElement(label, value, percentage) {
        const barDiv = document.createElement('div');
        barDiv.className = 'bar';
        barDiv.style.height = percentage + '%';
        barDiv.title = `${label}: ${value}`;
        
        barDiv.innerHTML = `
            <div class="bar-value">${value}</div>
            <div class="bar-label">${label}</div>
        `;
        
        // Animation au survol
        barDiv.addEventListener('mouseenter', () => this.highlightBar(barDiv));
        barDiv.addEventListener('mouseleave', () => this.unhighlightBar(barDiv));
        
        return barDiv;
    }
    
    // Effet de survol sur les barres
    highlightBar(bar) {
        bar.style.opacity = '0.8';
        bar.style.transform = 'scale(1.05)';
        bar.style.background = 'linear-gradient(to top, #f39c12, #e67e22)';
    }
    
    unhighlightBar(bar) {
        bar.style.opacity = '1';
        bar.style.transform = 'scale(1)';
        bar.style.background = 'linear-gradient(to top, #1a5276, #3498db)';
    }
    
    // Mises à jour périodiques des données
    initDataUpdates() {
        // Simulation de mises à jour en temps réel
        setInterval(() => {
            this.simulateDataUpdate();
        }, 10000); // Toutes les 10 secondes
    }
    
    simulateDataUpdate() {
        // Mise à jour aléatoire des données pour démonstration
        const randomUpdate = Math.random();
        
        if (randomUpdate > 0.7) {
            // Mettre à jour un établissement aléatoire
            const types = Object.keys(this.data.etablissements);
            const randomType = types[Math.floor(Math.random() * types.length)];
            this.data.etablissements[randomType] += Math.floor(Math.random() * 5);
            
            this.createEtablissementsChart();
            this.showDataUpdateNotification(`Nouveaux établissements enregistrés dans: ${randomType}`);
        }
        
        if (randomUpdate > 0.8) {
            // Mettre à jour un taux de scolarisation
            const districts = Object.keys(this.data.scolarisation);
            const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
            this.data.scolarisation[randomDistrict] += Math.floor(Math.random() * 2);
            
            this.createScolarisationChart();
            this.showDataUpdateNotification(`Amélioration du taux de scolarisation à: ${randomDistrict}`);
        }
    }
    
    showDataUpdateNotification(message) {
        // Créer une notification discrète
        const notification = document.createElement('div');
        notification.className = 'alert alert-info alert-dismissible fade show';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1050;
            min-width: 300px;
            font-size: 0.9rem;
        `;
        
        notification.innerHTML = `
            <i class="fas fa-sync-alt me-2"></i>
            ${message}
            <button type="button" class="btn-close btn-close-sm" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // Export des données
    exportData(format = 'json') {
        const dataStr = format === 'json' 
            ? JSON.stringify(this.data, null, 2)
            : this.convertToCSV();
        
        this.downloadData(dataStr, format);
    }
    
    convertToCSV() {
        let csv = 'Catégorie,Valeur\n';
        
        // Établissements
        Object.entries(this.data.etablissements).forEach(([key, value]) => {
            csv += `Établissements ${key},${value}\n`;
        });
        
        // Scolarisation
        Object.entries(this.data.scolarisation).forEach(([key, value]) => {
            csv += `Scolarisation ${key},${value}%\n`;
        });
        
        return csv;
    }
    
    downloadData(data, format) {
        const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `dren-statistiques-${new Date().toISOString().split('T')[0]}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Méthodes d'analyse
    getTotalEtablissements() {
        return Object.values(this.data.etablissements).reduce((a, b) => a + b, 0);
    }
    
    getMoyenneScolarisation() {
        const valeurs = Object.values(this.data.scolarisation);
        return valeurs.reduce((a, b) => a + b, 0) / valeurs.length;
    }
    
    getTendancePerformance() {
        const annees = Object.keys(this.data.performance).map(Number);
        const valeurs = Object.values(this.data.performance);
        
        if (annees.length < 2) return 0;
        
        const derniereValeur = valeurs[valeurs.length - 1];
        const avantDerniereValeur = valeurs[valeurs.length - 2];
        
        return ((derniereValeur - avantDerniereValeur) / avantDerniereValeur) * 100;
    }
}

// Interface utilisateur pour les statistiques
class StatisticsUI {
    constructor(manager) {
        this.manager = manager;
        this.initUI();
    }
    
    initUI() {
        this.createControlPanel();
        this.attachEventListeners();
    }
    
    createControlPanel() {
        const statsSection = document.getElementById('statistiques');
        if (!statsSection) return;
        
        const controlPanel = document.createElement('div');
        controlPanel.className = 'control-panel mb-4';
        controlPanel.innerHTML = `
            <div class="d-flex flex-wrap gap-2 justify-content-center">
                <button class="btn btn-sm btn-outline-primary" id="refreshStats">
                    <i class="fas fa-sync-alt"></i> Actualiser
                </button>
                <button class="btn btn-sm btn-outline-success" id="exportJSON">
                    <i class="fas fa-download"></i> Export JSON
                </button>
                <button class="btn btn-sm btn-outline-info" id="exportCSV">
                    <i class="fas fa-file-csv"></i> Export CSV
                </button>
                <button class="btn btn-sm btn-outline-secondary" id="showAnalytics">
                    <i class="fas fa-chart-line"></i> Analytics
                </button>
            </div>
        `;
        
        statsSection.querySelector('.container').insertBefore(controlPanel, statsSection.querySelector('.row'));
    }
    
    attachEventListeners() {
        document.getElementById('refreshStats')?.addEventListener('click', () => {
            this.refreshStatistics();
        });
        
        document.getElementById('exportJSON')?.addEventListener('click', () => {
            this.manager.exportData('json');
        });
        
        document.getElementById('exportCSV')?.addEventListener('click', () => {
            this.manager.exportData('csv');
        });
        
        document.getElementById('showAnalytics')?.addEventListener('click', () => {
            this.showAnalyticsModal();
        });
    }
    
    refreshStatistics() {
        // Simuler un rechargement
        const btn = document.getElementById('refreshStats');
        const originalHtml = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Actualisation...';
        btn.disabled = true;
        
        setTimeout(() => {
            // Recréer les graphiques
            this.manager.createEtablissementsChart();
            this.manager.createScolarisationChart();
            
            btn.innerHTML = originalHtml;
            btn.disabled = false;
            
            this.showNotification('Statistiques actualisées avec succès', 'success');
        }, 1000);
    }
    
    showAnalyticsModal() {
        const analytics = `
            <div class="row">
                <div class="col-md-6">
                    <h6>Total Établissements</h6>
                    <p class="h4 text-primary">${this.manager.getTotalEtablissements()}</p>
                </div>
                <div class="col-md-6">
                    <h6>Moyenne Scolarisation</h6>
                    <p class="h4 text-success">${this.manager.getMoyenneScolarisation().toFixed(1)}%</p>
                </div>
                <div class="col-md-12 mt-3">
                    <h6>Tendance Performance</h6>
                    <p class="h5 ${this.manager.getTendancePerformance() >= 0 ? 'text-success' : 'text-danger'}">
                        ${this.manager.getTendancePerformance() >= 0 ? '+' : ''}${this.manager.getTendancePerformance().toFixed(1)}%
                    </p>
                </div>
            </div>
        `;
        
        // Utiliser le modal Bootstrap s'il existe
        if (typeof bootstrap !== 'undefined') {
            this.showBootstrapModal('Analytics', analytics);
        } else {
            this.showSimpleModal('Analytics', analytics);
        }
    }
    
    showBootstrapModal(title, content) {
        // Créer un modal Bootstrap dynamique
        const modalId = 'analyticsModal';
        let modal = document.getElementById(modalId);
        
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.id = modalId;
            modal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            ${content}
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    }
    
    showSimpleModal(title, content) {
        // Solution de repli si Bootstrap n'est pas disponible
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1040;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        overlay.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 10px; max-width: 500px; width: 90%;">
                <h4>${title}</h4>
                ${content}
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="margin-top: 15px; padding: 5px 15px; background: #1a5276; color: white; border: none; border-radius: 5px;">
                    Fermer
                </button>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }
    
    showNotification(message, type) {
        // Réutiliser la fonction du main.js si disponible
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    window.statisticsManager = new StatisticsManager();
    window.statisticsUI = new StatisticsUI(window.statisticsManager);
});

// Export pour utilisation externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StatisticsManager, StatisticsUI };
}
