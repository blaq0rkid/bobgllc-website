// Dark Mode Toggle for Elite Obsidian
class DarkModeToggle {
    constructor() {
        this.toggle = document.getElementById('darkModeToggle');
        this.icon = this.toggle?.querySelector('.toggle-icon');
        // Default is dark mode (Elite Obsidian)
        this.isDark = localStorage.getItem('theme') !== 'light';
        this.init();
    }

    init() {
        // Apply saved theme or default to dark
        if (this.isDark) {
            document.body.classList.remove('light-mode');
            if (this.icon) this.icon.textContent = '☀️';
        } else {
            document.body.classList.add('light-mode');
            if (this.icon) this.icon.textContent = '🌙';
        }

        // Add event listener
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.isDark = !this.isDark;
        
        if (this.isDark) {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            if (this.icon) this.icon.textContent = '☀️';
        } else {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            if (this.icon) this.icon.textContent = '🌙';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeToggle();
});
