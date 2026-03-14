// APEX Roadmap Form Handler
document.getElementById('apexIntakeForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    showThankYouModal();
    this.reset();
});

// Federal Diagnostic Form Handler
document.getElementById('federalDiagnosticForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    showThankYouModal();
    this.reset();
});

// Thank You Modal Functions
function showThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    if (!modal) {
        createThankYouModal();
    }
    const modalElement = document.getElementById('thankYouModal');
    modalElement.classList.remove('hidden');
    modalElement.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus the modal
    const closeButton = modalElement.querySelector('.modal-close');
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
        <div id="thankYouModal" class="hidden" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" style="position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.8);">
            <div style="background: var(--glass-bg); border: 2px solid var(--accent-gold); border-radius: 12px; padding: 40px; max-width: 500px; margin: 20px; position: relative; backdrop-filter: blur(10px);">
                <button class="modal-close" onclick="closeThankYouModal()" aria-label="Close modal" style="position: absolute; top: 15px; right: 15px; background: transparent; border: 2px solid var(--accent-gold); color: var(--accent-gold); width: 35px; height: 35px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;">×</button>
                
                <div style="text-align: center;">
                    <div style="width: 80px; height: 3px; background: var(--accent-gold); margin: 0 auto 30px;"></div>
                    <h2 id="modal-title" style="color: var(--accent-gold); font-size: 2rem; margin-bottom: 15px;">Intelligence Received</h2>
                    <p id="modal-description" style="color: var(--text-muted); font-size: 1.2rem; margin-bottom: 30px;">Analysis in Progress.</p>
                    <p style="color: var(--text-muted); line-height: 1.6;">Our team will review your submission and contact you within 48 hours with a strategic roadmap tailored to your objectives.</p>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add escape key handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeThankYouModal();
        }
    });
}
