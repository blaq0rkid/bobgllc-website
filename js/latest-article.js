
// Load the latest article for the home page
const latestArticleFile = 'the-ultimate-guide-to-the-agency-matching-matrix.md';

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

async function loadLatestArticle() {
    const container = document.getElementById('latest-article-container');
    
    if (!container) {
        console.error('Latest article container not found');
        return;
    }
    
    try {
        const response = await fetch(`/articles/${latestArticleFile}`);
        
        if (!response.ok) {
            throw new Error('Article not found');
        }
        
        const text = await response.text();
        const article = parseMarkdown(text);
        
        if (!article) {
            throw new Error('Invalid article format');
        }
        
        container.innerHTML = `
            <div class="latest-article">
                <div class="latest-article-thumbnail">
                    <img src="${article.metadata.thumbnail || '/images/default-thumb.jpg'}" alt="${article.metadata.title}">
                </div>
                <div class="latest-article-content">
                    <span class="latest-article-badge">LATEST</span>
                    <h3>${article.metadata.title}</h3>
                    <p class="article-date">${new Date(article.metadata.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p class="article-excerpt">${article.metadata.excerpt}</p>
                    <a href="article.html?id=${encodeURIComponent(latestArticleFile.replace('.md', ''))}" class="read-more">Read Full Analysis →</a>
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('Error loading latest article:', error);
        container.innerHTML = '<p class="loading-message">Unable to load latest article.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadLatestArticle);
