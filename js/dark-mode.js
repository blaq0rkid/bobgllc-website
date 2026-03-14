
// Dark mode functionality
class DarkModeManager {
    constructor() {
        this.darkMode = localStorage.getItem('darkMode') === 'enabled';
        this.toggle = document.getElementById('darkModeToggle');
        this.init();
    }

    init() {
        // Apply saved preference
        if (this.darkMode) {
            this.enable();
        } else {
            this.disable();
        }

        // Add click listener
        if (this.toggle) {
            this.toggle.addEventListener('click', () => {
                if (this.darkMode) {
                    this.disable();
                } else {
                    this.enable();
                }
            });
        }
    }

    enable() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        this.darkMode = true;
        if (this.toggle) {
            this.toggle.querySelector('.toggle-icon').textContent = '☀️';
        }
    }

    disable() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        this.darkMode = false;
        if (this.toggle) {
            this.toggle.querySelector('.toggle-icon').textContent = '🌙';
        }
    }
}

// Initialize dark mode when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeManager();
});
