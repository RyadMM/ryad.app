// Preview rendering with markdown

import { t } from './i18n.js';

export function updatePreview(content) {
    const preview = document.getElementById('preview');
    preview.innerHTML = marked.parse(content);
}

export function checkContentLength() {
    const pageBreakMode = document.getElementById('pagebreak-toggle').checked ? 'auto' : 'one-page';

    if (pageBreakMode !== 'one-page') {
        hideWarning();
        return;
    }

    const preview = document.getElementById('preview');

    const availableHeight = 989;

    if (preview.scrollHeight > availableHeight) {
        showWarning();
    } else {
        hideWarning();
    }
}

function showWarning() {
    const warning = document.getElementById('pagebreak-warning');
    const text = document.getElementById('pagebreak-warning-text');
    text.textContent = t('pagebreakWarning');
    warning.classList.remove('hidden');
}

function hideWarning() {
    document.getElementById('pagebreak-warning').classList.add('hidden');
}
