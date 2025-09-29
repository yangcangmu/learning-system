// メインJavaScriptファイル
document.addEventListener('DOMContentLoaded', function() {
    // 統計データの更新
    updateStats();
    
    // ナビゲーションのアクティブ状態管理
    updateActiveNavigation();
    
    // フォームバリデーションの初期化
    initializeFormValidation();
    
    // レスポンシブメニューの初期化
    initializeResponsiveMenu();
});

// 統計データの更新
function updateStats() {
    // サンプルデータ（実際の実装ではAPIから取得）
    const stats = {
        resources: 25,
        users: 150,
        categories: 6
    };
    
    // 統計要素の更新
    const resourceCount = document.getElementById('resourceCount');
    const userCount = document.getElementById('userCount');
    const categoryCount = document.getElementById('categoryCount');
    
    if (resourceCount) resourceCount.textContent = stats.resources;
    if (userCount) userCount.textContent = stats.users;
    if (categoryCount) categoryCount.textContent = stats.categories;
}

// ナビゲーションのアクティブ状態管理
function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// フォームバリデーションの初期化
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

// フォームバリデーション
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    // Password confirmation
    const passwordFields = form.querySelectorAll('input[type="password"]');
    if (passwordFields.length >= 2) {
        const password = passwordFields[0].value;
        const confirmPassword = passwordFields[1].value;
        
        if (password && confirmPassword && password !== confirmPassword) {
            showFieldError(passwordFields[1], 'Passwords do not match');
            isValid = false;
        }
    }
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// フィールドエラーの表示
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#dc3545';
}

// フィールドエラーのクリア
function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

// レスポンシブメニューの初期化
function initializeResponsiveMenu() {
    // モバイルメニューのトグル機能（必要に応じて実装）
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// アラートメッセージの表示
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // ページの上部に挿入
    const main = document.querySelector('main');
    if (main) {
        main.insertBefore(alertDiv, main.firstChild);
        
        // 3秒後に自動削除
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
}

// ローディング状態の管理
function setLoading(element, isLoading) {
    if (isLoading) {
        element.disabled = true;
        element.textContent = '処理中...';
    } else {
        element.disabled = false;
        element.textContent = element.getAttribute('data-original-text') || '送信';
    }
}

// エクスポート
window.LearningSystem = {
    showAlert,
    setLoading,
    updateStats,
    updateActiveNavigation
};
