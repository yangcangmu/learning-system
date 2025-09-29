// フォームバリデーション専用JavaScriptファイル
document.addEventListener('DOMContentLoaded', function() {
    initializeValidation();
});

// バリデーションの初期化
function initializeValidation() {
    // ログインフォームのバリデーション
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        setupLoginValidation(loginForm);
    }
    
    // Registration form validation
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        setupRegisterValidation(registerForm);
    }
    
    // その他のフォームのバリデーション
    const forms = document.querySelectorAll('form:not(#loginForm):not(#registerForm)');
    forms.forEach(form => {
        setupGeneralValidation(form);
    });
}

// ログインフォームのバリデーション設定
function setupLoginValidation(form) {
    const usernameField = form.querySelector('#username');
    const passwordField = form.querySelector('#password');
    
    // リアルタイムバリデーション
    if (usernameField) {
        usernameField.addEventListener('blur', function() {
            validateUsername(this);
        });
        
        usernameField.addEventListener('input', function() {
            clearFieldError(this);
        });
    }
    
    if (passwordField) {
        passwordField.addEventListener('blur', function() {
            validatePassword(this);
        });
        
        passwordField.addEventListener('input', function() {
            clearFieldError(this);
        });
    }
}

// Registration form validation setup
function setupRegisterValidation(form) {
    const usernameField = form.querySelector('#username');
    const emailField = form.querySelector('#email');
    const passwordField = form.querySelector('#password');
    const confirmPasswordField = form.querySelector('#confirmPassword');
    const termsField = form.querySelector('#agreeTerms');
    
    // ユーザー名のバリデーション
    if (usernameField) {
        usernameField.addEventListener('blur', function() {
            validateUsername(this, true);
        });
        
        usernameField.addEventListener('input', function() {
            clearFieldError(this);
            checkUsernameAvailability(this);
        });
    }
    
    // Email validation
    if (emailField) {
        emailField.addEventListener('blur', function() {
            validateEmail(this);
        });
        
        emailField.addEventListener('input', function() {
            clearFieldError(this);
        });
    }
    
    // Password validation
    if (passwordField) {
        passwordField.addEventListener('input', function() {
            updatePasswordStrength(this);
            clearFieldError(this);
        });
        
        passwordField.addEventListener('blur', function() {
            validatePassword(this);
        });
    }
    
    // Password confirmation validation
    if (confirmPasswordField) {
        confirmPasswordField.addEventListener('blur', function() {
            validatePasswordConfirmation(this, passwordField);
        });
        
        confirmPasswordField.addEventListener('input', function() {
            clearFieldError(this);
        });
    }
    
    // 利用規約の確認
    if (termsField) {
        termsField.addEventListener('change', function() {
            validateTermsAgreement(this);
        });
    }
}

// 一般的なフォームのバリデーション設定
function setupGeneralValidation(form) {
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateRequiredField(this);
        });
        
        field.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// ユーザー名のバリデーション
function validateUsername(field, isRegistration = false) {
    const value = field.value.trim();
    const minLength = 3;
    const maxLength = 20;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    
    if (!value) {
        showFieldError(field, 'Username is required');
        return false;
    }
    
    if (value.length < minLength) {
        showFieldError(field, `Username must be at least ${minLength} characters`);
        return false;
    }
    
    if (value.length > maxLength) {
        showFieldError(field, `Username must be no more than ${maxLength} characters`);
        return false;
    }
    
    if (!usernameRegex.test(value)) {
        showFieldError(field, 'Username can only contain letters, numbers, and underscores');
        return false;
    }
    
    if (isRegistration) {
        // Check for duplicates during registration (in actual implementation, API call)
        // Temporarily disabled for testing
        // if (checkUsernameExists(value)) {
        //     showFieldError(field, 'This username is already taken');
        //     return false;
        // }
    }
    
    clearFieldError(field);
    return true;
}

// Email validation
function validateEmail(field) {
    const value = field.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!value) {
        showFieldError(field, 'Email address is required');
        return false;
    }
    
    if (!emailRegex.test(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

// Password validation
function validatePassword(field) {
    const value = field.value;
    const minLength = 5;
    
    if (!value) {
        showFieldError(field, 'Password is required');
        return false;
    }
    
    if (value.length < minLength) {
        showFieldError(field, `Password must be at least ${minLength} characters`);
        return false;
    }
    
    clearFieldError(field);
    return true;
}

// Password confirmation validation
function validatePasswordConfirmation(field, passwordField) {
    const value = field.value;
    const password = passwordField.value;
    
    if (!value) {
        showFieldError(field, 'Password confirmation is required');
        return false;
    }
    
    if (value !== password) {
        showFieldError(field, 'Passwords do not match');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

// Required field validation
function validateRequiredField(field) {
    const value = field.value.trim();
    
    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

// 利用規約の同意確認
function validateTermsAgreement(field) {
    if (!field.checked) {
        showFieldError(field, '利用規約に同意してください');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

// パスワード強度の更新
function updatePasswordStrength(field) {
    const password = field.value;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthFill || !strengthText) return;
    
    let strength = 0;
    let strengthLabel = '';
    
    // 長さチェック
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    
    // 文字種チェック
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    // 強度の表示
    if (strength < 2) {
        strengthFill.className = 'strength-fill strength-weak';
        strengthFill.style.width = '20%';
        strengthLabel = 'Weak';
    } else if (strength < 4) {
        strengthFill.className = 'strength-fill strength-medium';
        strengthFill.style.width = '60%';
        strengthLabel = 'Medium';
    } else {
        strengthFill.className = 'strength-fill strength-strong';
        strengthFill.style.width = '100%';
        strengthLabel = 'Strong';
    }
    
    strengthText.textContent = `Password strength: ${strengthLabel}`;
}

// ユーザー名の重複チェック（モック）
function checkUsernameExists(username) {
    // 実際の実装ではAPI呼び出し
    const existingUsernames = ['admin', 'user1', 'user2', 'test'];
    return existingUsernames.includes(username.toLowerCase());
}

// ユーザー名の利用可能性チェック
function checkUsernameAvailability(field) {
    const value = field.value.trim();
    
    if (value.length >= 3 && /^[a-zA-Z0-9_]+$/.test(value)) {
        // Temporarily disabled for testing
        // if (checkUsernameExists(value)) {
        //     showFieldError(field, 'This username is already taken');
        // } else {
            clearFieldError(field);
        // }
    }
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

// エクスポート
window.Validation = {
    validateUsername,
    validateEmail,
    validatePassword,
    validatePasswordConfirmation,
    validateRequiredField,
    validateTermsAgreement,
    showFieldError,
    clearFieldError
};
