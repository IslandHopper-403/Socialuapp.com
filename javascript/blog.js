// javascript/blog.js - COMPLETE FILE REPLACEMENT

/**
 * Blog functionality - search, filter, and pagination
 */

// Pagination settings
let articlesPerPage = 6; // Show 6 articles initially
let currentlyShowing = articlesPerPage;

// Initialize pagination on page load
function initPagination() {
    const allArticles = document.querySelectorAll('.blog-card');
    const loadMoreBtn = document.querySelector('.load-more-section');
    
    // Hide articles beyond initial count
    allArticles.forEach((article, index) => {
        if (index >= articlesPerPage) {
            article.style.display = 'none';
            article.classList.add('hidden-article');
        }
    });
    
    // Hide button if all articles already showing
    if (allArticles.length <= articlesPerPage) {
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    }
    
    console.log(`📦 Showing ${Math.min(articlesPerPage, allArticles.length)} of ${allArticles.length} articles`);
}

// Load more articles (pagination)
function loadMoreArticles() {
    console.log('📦 Loading more articles...');
    
    const allArticles = document.querySelectorAll('.blog-card');
    const hiddenArticles = document.querySelectorAll('.blog-card.hidden-article');
    const loadMoreBtn = document.querySelector('.load-more-section');
    
    // Show next batch of articles
    let articlesToShow = Math.min(3, hiddenArticles.length); // Show 3 more at a time
    
    for (let i = 0; i < articlesToShow; i++) {
        if (hiddenArticles[i]) {
            hiddenArticles[i].style.display = 'block';
            hiddenArticles[i].classList.remove('hidden-article');
            
            // Fade in animation
            setTimeout(() => {
                hiddenArticles[i].style.opacity = '1';
                hiddenArticles[i].style.transform = 'translateY(0)';
            }, i * 100); // Stagger the animation
        }
    }
    
    currentlyShowing += articlesToShow;
    
    // Hide button if all articles now showing
    const remainingHidden = document.querySelectorAll('.blog-card.hidden-article').length;
    if (remainingHidden === 0) {
        if (loadMoreBtn) {
            loadMoreBtn.style.opacity = '0';
            setTimeout(() => {
                loadMoreBtn.style.display = 'none';
            }, 300);
        }
        console.log('✅ All articles loaded!');
    } else {
        console.log(`📦 Now showing ${currentlyShowing} of ${allArticles.length} articles`);
    }
}

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
    let visibleCount = 0;
    
    articles.forEach(article => {
        const articleCategory = article.getAttribute('data-category');
        
        if (category === 'all' || articleCategory === category) {
            article.style.display = 'block';
            article.classList.remove('hidden-article');
            setTimeout(() => {
                article.style.opacity = '1';
                article.style.transform = 'translateY(0)';
            }, 10);
            visibleCount++;
        } else {
            article.style.opacity = '0';
            article.style.transform = 'translateY(20px)';
            setTimeout(() => {
                article.style.display = 'none';
            }, 300);
        }
    });
    
    // Hide "Load More" button when filtering (show all matches)
    const loadMoreBtn = document.querySelector('.load-more-section');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
    
    console.log(`✅ Showing ${visibleCount} articles in category: ${category}`);
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
            article.classList.remove('hidden-article');
            article.style.opacity = '1';
            foundCount++;
        } else {
            article.style.display = 'none';
            article.style.opacity = '0';
        }
    });
    
    // Hide "Load More" button when searching
    const loadMoreBtn = document.querySelector('.load-more-section');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
    
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
    
    // Initialize pagination
    initPagination();
});

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    console.log('📧 Newsletter subscription:', email);
    
    // In production, send to your email service (Mailchimp, ConvertKit, etc.)
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
