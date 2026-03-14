
// Article configuration - add your article filenames here
const articles = [
    // Replace these with your actual article filenames
    'article-1.md',
    'article-2.md',
    'article-3.md',
    'article-4.md',
    'article-5.md',
    'article-6.md',
    'article-7.md',
    'article-8.md'
];

// Function to parse markdown frontmatter and content
function parseMarkdown(text) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = text.match(frontmatterRegex);
    
    if (!match) return null;
    
    const frontmatter = {};
    const lines = match[1].split('\n');
    
    lines.forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
            frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
        }
    });
    
    return {
        metadata: frontmatter,
        content: match[2].trim()
    };
}

// Function to load and display articles
async function loadArticles() {
    const container = document.getElementById('articles-container');
    
    if (!container) {
        console.error('Articles container not found');
        return;
    }
    
    for (const filename of articles) {
        try {
            const response = await fetch(`/articles/${filename}`);
            
            if (!response.ok) continue;
            
            const text = await response.text();
            const article = parseMarkdown(text);
            
            if (!article) continue;
            
            // Create article card
            const card = document.createElement('div');
            card.className = 'article-card';
            card.innerHTML = `
                <div class="article-thumbnail">
                    <img src="${article.metadata.thumbnail || '/images/default-thumb.jpg'}" alt="${article.metadata.title}">
                </div>
                <div class="article-content">
                    <h3>${article.metadata.title}</h3>
                    <p class="article-date">${new Date(article.metadata.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p class="article-excerpt">${article.metadata.excerpt}</p>
                    <a href="/article.html?id=${filename.replace('.md', '')}" class="read-more">Read Full Analysis →</a>
                </div>
            `;
            
            container.appendChild(card);
            
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
        }
    }
}

// Load articles when page loads
document.addEventListener('DOMContentLoaded', loadArticles);
