// Main app initialization and orchestration

import * as storage from './storage.js';
import { loadI18n, setLang, updateLanguageUI, updateLanguageButtons, t } from './i18n.js';
import { initEditor, loadContent, getContent } from './editor.js';
import { updatePreview, checkContentLength } from './preview.js';
import { downloadPDF } from './pdf.js';
import { escapeHtml, showRenameModal, closeMobileMenu, toggleMobileMenu, toggleSidebar as uiToggleSidebar, initSidebar as uiInitSidebar, showBatchDeleteModal, hideBatchDeleteModal, showProgressOverlay, hideProgressOverlay, updateProgress } from './ui.js';
import * as sidebar from './sidebar.js';
import { toggleCVSelection, selectAll, batchDownloadMD, batchDownloadPDF, batchDelete, getSelectedCVs, clearSelection } from './selection.js';
import { initSwipeGesture, destroySwipeGesture } from './swipe.js';
 
let pageBreakMode = 'one-page';
let renamingCVId = null;

const defaultContent = `# Jane Doe

City, Country
+1 234 567 890 · jane.doe@email.com

## Summary

Professional and detail-oriented. Experience in case management, information documentation, and customer service. Autonomy, organizational skills, quality verification, and adherence to procedures.

## Key Skills

- Rigor, attention to detail, and consistency
- Autonomy, organization, and respect for procedures
- Case management, follow-ups, and priority management
- Information documentation and clear communication
- Customer service (email / phone / in person)
- Comfort with digital tools (email, web applications)

## Experience

### Sales and Media Solutions Coordinator — Example Company
*March 2024 — Present*

- Handles client requests via email and phone with courteous and efficient service.
- Ensures case follow-up, performs follow-up calls, and documents necessary information.
- Verifies mockups/designs and validates compliance with client requirements (errors, typos, etc.) before final approval.
- Plans themes (e.g., seasonal) and coordinates relevant stakeholders in advance.
- Processes approximately **10 to 15 requests per day** and prioritizes based on urgency and deadlines.

### Dental Assistant — Example Clinic
*September 2016 — January 2020*

- Prepares rooms and instruments according to sterilization protocols and established procedures.
- Anticipates unexpected issues and adapts quickly to ensure smooth treatment progression.
- Performs verifications and follow-ups related to treatments (e.g., x-rays) with rigor.
- Schedules appointments, documents relevant information, and performs post-operative follow-ups.

### Dental Assistant — Another Clinic
*March 2008 — September 2016*

- Prepares patients for examinations and assists during examinations.
- Sterilizes and maintains instruments and equipment.

## Education

- Technical Training — Dental Implant Procedure ALL-ON-4® (Dr Paulo Malo), 2019
- D.E.P. Dental Assistance, 2008

## Languages

- English (native) · French (intermediate)
`;

async function init() {
    console.log('CV Generator init() starting...');

    const lang = storage.loadLanguage();
    setLang(lang);
    await loadI18n();
    updateLanguageUI();
    updateLanguageButtons();

    uiInitSidebar();
    initPageBreakToggle();

    const cvs = storage.loadCVs();
    sidebar.initSidebar(cvs);

    initEditor(handleEditorInput);
    initSwipeGesture();

    setupEventListeners();
    updateViewState();

    console.log('CV Generator initialized successfully');
}

function setupEventListeners() {
    console.log('Setting up event listeners...');

    document.getElementById('lang-en').addEventListener('click', () => handleLanguageChange('en'));
    document.getElementById('lang-fr').addEventListener('click', () => handleLanguageChange('fr'));
    document.getElementById('download-btn').addEventListener('click', handleDownloadPDF);
    document.getElementById('import-btn').addEventListener('click', handleImport);
    document.getElementById('export-btn').addEventListener('click', handleExport);
    document.getElementById('file-input').addEventListener('change', handleFileImport);
    document.getElementById('pagebreak-toggle').addEventListener('change', handlePageBreakToggle);

    document.getElementById('sidebar-toggle').addEventListener('click', () => {
        uiToggleSidebar();
        clearSelection();
    });

    document.getElementById('new-cv-btn').addEventListener('click', handleCreateNewCV);
    document.getElementById('new-cv-btn-collapsed').addEventListener('click', handleCreateNewCV);

    document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);
    document.getElementById('mobile-overlay').addEventListener('click', closeMobileMenu);

    document.getElementById('empty-state-new-cv').addEventListener('click', handleCreateNewCV);

    document.getElementById('select-all-btn').addEventListener('click', handleSelectAll);
    document.getElementById('batch-download-md-btn').addEventListener('click', handleBatchDownloadMD);
    document.getElementById('batch-download-pdf-btn').addEventListener('click', handleBatchDownloadPDF);
    document.getElementById('batch-delete-btn').addEventListener('click', handleShowBatchDeleteModal);
    document.getElementById('progress-cancel').addEventListener('click', handleCancelBatchOperation);

    setupCVListListeners();
}

function setupCVListListeners() {
    const cvList = document.getElementById('cv-list');

    cvList.addEventListener('click', (e) => {
        const item = e.target.closest('.cv-item');
        if (!item) return;
        const id = item.dataset.id;

        if (e.target.closest('.cv-checkbox')) {
            e.stopPropagation();
            e.preventDefault();
            toggleCVSelection(id);
            return;
        }

        if (e.target.closest('.cv-action-btn')) {
            e.stopPropagation();
            e.preventDefault();
            const action = e.target.closest('.cv-action-btn').dataset.action;
            if (action === 'rename') {
                handleRename(id);
            } else if (action === 'delete') {
                handleDelete(id);
            }
            return;
        }

        e.stopPropagation();
        handleCVClick(id);
    });
}

function handleEditorInput(content) {
    const currentCV = sidebar.getCurrentCV();
    if (currentCV) {
        sidebar.updateCV(sidebar.getCurrentCVId(), { content });

        const newName = storage.extractName(content);
        if (currentCV.name !== newName) {
            sidebar.updateCV(sidebar.getCurrentCVId(), { name: newName });
            sidebar.renderCVList();
        }

        const cvs = sidebar.getCVs();
        storage.saveCVs(cvs, sidebar.getCurrentCVId());
    }

    updatePreview(content);
    checkContentLength();
}

function handleLanguageChange(lang) {
    if (lang === storage.loadLanguage()) return;

    storage.saveLanguage(lang);
    setLang(lang);
    loadI18n().then(() => {
        updateLanguageUI();
        updateLanguageButtons();
        sidebar.renderCVList();
    });
}

function handleDownloadPDF() {
    const cv = sidebar.getCurrentCV();
    if (!cv) return;

    downloadPDF(cv, pageBreakMode);
}

function handleImport() {
    document.getElementById('file-input').click();
}

function handleExport() {
    const cv = sidebar.getCurrentCV();
    if (!cv) return;

    const blob = new Blob([cv.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = storage.generateMarkdownFilename(cv.name);
    a.click();
    URL.revokeObjectURL(url);
}

function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        const name = storage.extractName(content) || 'Imported CV';
        sidebar.createCV(name, content);
        storage.saveCVs(sidebar.getCVs(), sidebar.getCurrentCVId());
        updateViewState();
        event.target.value = '';
        closeMobileMenu();
    };
    reader.readAsText(file);
}

function handlePageBreakToggle(e) {
    pageBreakMode = e.target.checked ? 'auto' : 'one-page';
    storage.savePageBreakMode(pageBreakMode);

    if (pageBreakMode === 'one-page') {
        checkContentLength();
    } else {
        checkContentLength();
    }
}

function handleCreateNewCV() {
    const defaultName = t('noCVs') === 'No CVs yet' ? 'New CV' : 'Nouveau CV';
    sidebar.createCV(defaultName, defaultContent);
    storage.saveCVs(sidebar.getCVs(), sidebar.getCurrentCVId());
    updateViewState();
    clearSelection();
    closeMobileMenu();
}

function handleCVClick(id) {
    sidebar.selectCV(id);
    storage.saveCVs(sidebar.getCVs(), sidebar.getCurrentCVId());
    loadCurrentCV();
    clearSelection();
}

function handleRename(id) {
    const cvs = sidebar.getCVs();
    const cv = cvs[id];
    if (!cv) return;

    renamingCVId = id;
    showRenameModal(cv.name, (newName) => {
        sidebar.renameCV(id, newName);
        storage.saveCVs(sidebar.getCVs(), sidebar.getCurrentCVId());
        renamingCVId = null;
    }, () => {
        renamingCVId = null;
    });
}

function handleDelete(id) {
    if (sidebar.deleteCV(id)) {
        storage.saveCVs(sidebar.getCVs(), sidebar.getCurrentCVId());
        updateViewState();
    }
}

function handleToggleSelectionMode() {
    clearSelection();
}

function handleSelectAll() {
    selectAll(Object.keys(sidebar.getCVs()));
}

function handleClearSelection() {
    clearSelection();
    closeMobileMenu();
}

function handleBatchDownloadMD() {
    batchDownloadMD(sidebar.getCVs());
}

function handleBatchDownloadPDF() {
    batchDownloadPDF(sidebar.getCVs());
}

function handleShowBatchDeleteModal() {
    const selectedIds = Array.from(getSelectedCVs());
    const cvs = sidebar.getCVs();

    showBatchDeleteModal(cvs, selectedIds, () => {
        if (batchDelete(cvs)) {
            storage.saveCVs(cvs, sidebar.getCurrentCVId());
            sidebar.setCVs(cvs);
            sidebar.initSidebar(cvs);
            updateViewState();
            clearSelection();
        }
    }, () => {
        hideBatchDeleteModal();
    });
}

function handleCancelBatchOperation() {
    hideProgressOverlay();
    clearSelection();
}

function initPageBreakToggle() {
    pageBreakMode = storage.loadPageBreakMode();
    const toggle = document.getElementById('pagebreak-toggle');
    toggle.checked = pageBreakMode === 'auto';
    checkContentLength();
}

function loadCurrentCV() {
    const cv = sidebar.getCurrentCV();
    if (!cv) return;

    loadContent(cv.content);
    updatePreview(cv.content);
    checkContentLength();
    updateActiveCVHighlight();
}

function updateActiveCVHighlight() {
    document.querySelectorAll('.cv-item').forEach(item => {
        item.classList.remove('active');
    });
    sidebar.renderCVList();
}

function updateViewState() {
    const cvs = sidebar.getCVs();
    const hasCVs = Object.keys(cvs).length > 0;
    const emptyState = document.getElementById('empty-state');
    const editorPreviewWrapper = document.getElementById('editor-preview-wrapper');

    if (hasCVs) {
        emptyState.classList.remove('show');
        if (editorPreviewWrapper) {
            editorPreviewWrapper.style.display = 'flex';
        }
        if (sidebar.getCurrentCVId()) {
            loadCurrentCV();
        }
    } else {
        emptyState.classList.add('show');
        if (editorPreviewWrapper) {
            editorPreviewWrapper.style.display = 'none';
        }
    }
}

// Start the app when DOM is ready
// Start app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

