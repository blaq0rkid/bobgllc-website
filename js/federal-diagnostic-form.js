// Federal Diagnostic Form Handler
document.getElementById('federalDiagnosticForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    showThankYouModal();
    this.reset();
});
