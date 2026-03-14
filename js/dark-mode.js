// Dark Mode Toggle - Elite Obsidian
class DarkModeToggle {
    constructor() {
        this.toggle = document.getElementById('darkModeToggle');
        this.icon = this.toggle?.querySelector('.toggle-icon');
        // Check saved preference, default to dark
        this.isLight = localStorage.getItem('theme') === 'light';
        this.init();
    }

    init() {
        // Apply saved theme
        if (this.isLight) {
            document.body.classList.add('light-mode');
            if (this.icon) this.icon.textContent = '🌙';
        } else {
            document.body.classList.remove('light-mode');
            if (this.icon) this.icon.textContent = '☀️';
        }

        // Add event listener
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.isLight = !this.isLight;
        
        if (this.isLight) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            if (this.icon) this.icon.textContent = '🌙';
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            if (this.icon) this.icon.textContent = '☀️';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeToggle();
});
