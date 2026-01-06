// Internationalization (i18n) module

let i18nData = {};
let currentLang = 'en';

export async function loadI18n() {
    const response = await fetch('locales/' + currentLang + '.json');
    i18nData = await response.json();
    return i18nData;
}

export function setLang(lang) {
    currentLang = lang;
}

export function getLang() {
    return currentLang;
}

export function t(key) {
    return i18nData[key] || key;
}

export function getData() {
    return i18nData;
}

export function updateLanguageUI() {
    const t = i18nData;

    document.getElementById('app-title').textContent = t.title;
    document.getElementById('app-subtitle').textContent = t.subtitle;
    document.getElementById('editor-label').textContent = t.editor;
    document.getElementById('preview-label').textContent = t.preview;
    document.getElementById('pagebreak-one-page').textContent = t.pagebreakOnePage;
    document.getElementById('pagebreak-auto').textContent = t.pagebreakAuto;
    document.getElementById('download-btn-text').textContent = t.download;
    document.getElementById('import-btn-text').textContent = t.import;
    document.getElementById('export-btn-text').textContent = t.export;
    document.getElementById('editor').placeholder = t.placeholder;
    document.getElementById('sidebar-title').textContent = t.myCVs;
    document.getElementById('new-cv-btn').innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        <span id="new-cv-btn-text">${t.newCV}</span>
    `;
    document.getElementById('rename-modal-title').textContent = t.renameCV;
    document.getElementById('rename-cancel').textContent = t.cancel;
    document.getElementById('rename-save').textContent = t.save;
    document.getElementById('empty-state-title').textContent = t.noCVs;
    document.getElementById('empty-state-description').textContent = t.noCVsDescription;
    document.getElementById('empty-state-new-cv-text').textContent = t.createFirstCV;
    document.getElementById('batch-delete-cancel').textContent = t.cancel;
    document.getElementById('batch-delete-confirm').textContent = t.delete;
    document.getElementById('progress-cancel').textContent = t.cancel;
}

export function updateLanguageButtons() {
    const enBtn = document.getElementById('lang-en');
    const frBtn = document.getElementById('lang-fr');

    enBtn.classList.remove('active');
    frBtn.classList.remove('active');

    if (currentLang === 'en') {
        enBtn.classList.add('active');
    } else {
        frBtn.classList.add('active');
    }
}
