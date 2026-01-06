// PDF generation

import { t } from './i18n.js';
import { generatePDFFilename } from './storage.js';
import * as storage from './storage.js';

export function downloadPDF(cv, pageBreakMode) {
    const preview = document.getElementById('preview');
    const warning = document.getElementById('pagebreak-warning');

    if (pageBreakMode === 'one-page' && !warning.classList.contains('hidden')) {
        alert(t('pagebreakWarning'));
        return;
    }

    const filename = generatePDFFilename(cv.name);
    const loading = document.getElementById('loading');
    loading.classList.add('show');

    const config = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            letterRendering: true
        },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait'
        },
        pagebreak: pageBreakMode === 'one-page'
            ? { mode: 'avoid-all' }
            : { mode: ['css', 'legacy'] }
    };

    html2pdf().set(config).from(preview).save().then(() => {
        loading.classList.remove('show');
    }).catch(err => {
        console.error('PDF generation error:', err);
        loading.classList.remove('show');
        alert(t('loading') + ' Error: ' + err.message);
    });
}

export async function generatePDFForCV(cv) {
    return new Promise((resolve, reject) => {
        const tempPreview = document.createElement('div');
        tempPreview.className = 'cv-template';
        tempPreview.style.position = 'fixed';
        tempPreview.style.left = '-9999px';
        tempPreview.style.width = '8.5in';
        tempPreview.style.padding = '0.4in';
        tempPreview.style.paddingBottom = '0.3in';
        tempPreview.innerHTML = marked.parse(cv.content);

        document.body.appendChild(tempPreview);

        const filename = generatePDFFilename(cv.name);

        html2pdf().set({
            margin: 0,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                letterRendering: true
            },
            jsPDF: {
                unit: 'in',
                format: 'letter',
                orientation: 'portrait'
            },
            pagebreak: { mode: 'avoid-all' }
        }).from(tempPreview).save().then(() => {
            document.body.removeChild(tempPreview);
            resolve();
        }).catch(reject);
    });
}
