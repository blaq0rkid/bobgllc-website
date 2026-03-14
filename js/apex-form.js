// APEX Roadmap Form Handler
document.getElementById('apexIntakeForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    showThankYouModal();
    this.reset();
});
