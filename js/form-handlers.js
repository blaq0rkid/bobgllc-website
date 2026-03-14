// Form Handlers for all intake forms

// APEX Roadmap Form
document.getElementById('apexRoadmapForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    showThankYouModal();
    setTimeout(() => this.reset(), 500);
});

// Federal Diagnostic Form
document.getElementById('federalDiagnosticForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    showThankYouModal();
    setTimeout(() => this.reset(), 500);
});

// Sub-to-Prime Form
document.getElementById('subToPrimeForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    showThankYouModal();
    setTimeout(() => this.reset(), 500);
});

// Thank You Modal Functions
function showThankYouModal() {
    let modal = document.getElementById('thankYouModal');
    if (!modal) {
        createThankYouModal();
        modal = document.getElementById('thankYouModal');
    }
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) closeButton.focus();
}

function closeThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

function createThankYouModal() {
    const modalHTML = `
        <div id="thankYouModal" class="modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
            <div class="modal-content">
                <button class="modal-close" onclick="closeThankYouModal()" aria-label="Close modal">×</button>
                
                <div class="modal-divider"></div>
                <h2 id="modal-title" style="color: var(--gold); font-size: 2rem; margin-bottom: 1rem;">Intelligence Received</h2>
                <p id="modal-description" style="color: var(--text-dim); font-size: 1.2rem; margin-bottom: 2rem;">Analysis in Progress.</p>
                <p style="color: var(--text-dim); line-height: 1.6;">Our team will review your submission and contact you within 48 hours with a strategic roadmap tailored to your objectives.</p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Escape key handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeThankYouModal();
        }
    });
    
    // Click outside to close
    document.getElementById('thankYouModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeThankYouModal();
        }
    });
}
