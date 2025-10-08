// javascript/blog.js

/**
 * Blog functionality - search, filter, and load more
 */

// Filter articles by category
function filterCategory(category) {
    console.log('🎯 Filtering by category:', category);
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter articles
    const articles = document.querySelectorAll('.blog-card');
    articles.forEach(article => {
        const articleCategory = article.getAttribute('data-category');
        
        if (category === 'all' || articleCategory === category) {
            article.style.display = 'block';
            setTimeout(() => {
                article.style.opacity = '1';
                article.style.transform = 'translateY(0)';
            }, 10);
        } else {
            article.style.opacity = '0';
            article.style.transform = 'translateY(20px)';
            setTimeout(() => {
                article.style.display = 'none';
            }, 300);
        }
    });
}

// Search blog posts
function searchBlog() {
    const searchTerm = document.getElementById('blogSearch').value.toLowerCase();
    console.log('🔍 Searching for:', searchTerm);
    
    if (!searchTerm) {
        alert('Please enter a search term');
        return;
    }
    
    const articles = document.querySelectorAll('.blog-card');
    let foundCount = 0;
    
    articles.forEach(article => {
        const title = article.querySelector('h3').textContent.toLowerCase();
        const description = article.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            article.style.display = 'block';
            article.style.opacity = '1';
            foundCount++;
        } else {
            article.style.display = 'none';
            article.style.opacity = '0';
        }
    });
    
    // Show results message
    if (foundCount === 0) {
        alert(`No articles found for "${searchTerm}". Try different keywords!`);
    } else {
        console.log(`✅ Found ${foundCount} articles`);
    }
}

// Allow Enter key to search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('blogSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBlog();
            }
        });
    }
});

// Load more articles (pagination simulation)
let articlesLoaded = 6; // Initial articles shown
function loadMoreArticles() {
    console.log('📦 Loading more articles...');
    
    // In a real implementation, this would fetch from a database or API
    // For now, we'll just show a message
    alert('More articles coming soon! We\'re constantly adding new Hoi An travel guides and tips.');
    
    // You can implement actual loading logic here when you have more articles
    // Example:
    // fetchMoreArticles(articlesLoaded, articlesLoaded + 6)
    //     .then(newArticles => {
    //         appendArticlesToGrid(newArticles);
    //         articlesLoaded += 6;
    //     });
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    console.log('📧 Newsletter subscription:', email);
    
    // In production, send to your email service (Mailchimp, ConvertKit, etc.)
    // For now, show success message
    alert(`🎉 Thanks for subscribing! You'll receive our weekly Hoi An travel tips at ${email}`);
    emailInput.value = '';
    
    // TODO: Integrate with actual email service
    // Example: sendToMailchimp(email);
}

// Check for category parameter in URL
function checkURLCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        // Find and click the appropriate category button
        const categoryBtn = Array.from(document.querySelectorAll('.category-btn'))
            .find(btn => btn.textContent.toLowerCase().includes(category.toLowerCase()));
        
        if (categoryBtn) {
            categoryBtn.click();
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('📝 Blog page loaded');
    checkURLCategory();
});
