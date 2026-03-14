// Simple markdown to HTML converter
function markdownToHTML(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');
    
    // Unordered lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Paragraphs
    html = html.split('\n\n').map(para => {
        if (!para.startsWith('<') && para.trim()) {
            return `<p>${para}</p>`;
        }
        return para;
    }).join('\n');
    
    return html;
}

// Parse markdown frontmatter and content
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

// Load and display article
async function loadArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
        document.getElementById('article-title').textContent = 'Article Not Found';
        document.getElementById('article-content').innerHTML = '<p>No article specified.</p>';
        return;
    }
    
    try {
        const response = await fetch(`/articles/${articleId}.md`);
        
        if (!response.ok) {
            throw new Error('Article not found');
        }
        
        const text = await response.text();
        const article = parseMarkdown(text);
        
        if (!article) {
            throw new Error('Invalid article format');
        }
        
        // Update page title and meta
        document.title = `${article.metadata.title} | BOBG LLC`;
        document.getElementById('article-title').textContent = article.metadata.title;
        document.getElementById('article-date').textContent = new Date(article.metadata.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Convert markdown to HTML and display
        document.getElementById('article-content').innerHTML = markdownToHTML(article.content);
        
    } catch (error) {
        console.error('Error loading article:', error);
        document.getElementById('article-title').textContent = 'Error Loading Article';
        document.getElementById('article-content').innerHTML = '<p>Sorry, we could not load this article.</p>';
    }
}

// Load article when page loads
document.addEventListener('DOMContentLoaded', loadArticle);
