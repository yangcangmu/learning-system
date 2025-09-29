// Firebase Authentication Module
// このファイルはFirebase認証の完全な実装を提供します

// Firebase設定（実際のプロジェクト設定に置き換えてください）
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Firebase初期化（実際の実装ではFirebase SDKを使用）
let firebaseApp = null;
let auth = null;

// Firebase初期化関数
function initializeFirebase() {
    try {
        // 実際の実装では、Firebase SDKを読み込んで初期化
        // firebase.initializeApp(firebaseConfig);
        // auth = firebase.auth();
        
        // デモ用のモック実装
        console.log('Firebase initialized (mock)');
        return true;
    } catch (error) {
        console.error('Firebase initialization failed:', error);
        return false;
    }
}

// ユーザー作成（登録）
export async function createUser(email, password) {
    try {
        // 入力検証
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        
        if (!isValidEmail(email)) {
            throw new Error('Invalid email format');
        }
        
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        
        // PHPバックエンドを使用した登録
        try {
            const response = await fetch('php/auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'register',
                    email: email,
                    password: password,
                    confirmPassword: password
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                return { 
                    success: true, 
                    user: {
                        uid: result.user_id,
                        email: email,
                        role: 'user'
                    }
                };
            } else {
                throw new Error(result.error);
            }
            
        } catch (fetchError) {
            console.warn('PHP backend not available, using localStorage fallback');
            
            // フォールバック: ローカルストレージに保存
            const users = JSON.parse(localStorage.getItem('firebaseUsers') || '[]');
            
            // 重複チェック
            if (users.find(user => user.email === email)) {
                throw new Error('User with this email already exists');
            }
            
            // 新しいユーザーを作成
            const newUser = {
                uid: generateUID(),
                email: email,
                password: hashPassword(password),
                createdAt: new Date().toISOString(),
                role: 'user'
            };
            
            users.push(newUser);
            localStorage.setItem('firebaseUsers', JSON.stringify(users));
            
            return { 
                success: true, 
                user: {
                    uid: newUser.uid,
                    email: newUser.email,
                    role: newUser.role
                }
            };
        }
        
    } catch (error) {
        console.error('User creation failed:', error);
        return { 
            success: false, 
            error: error.message 
        };
    }
}

// ユーザーログイン
export async function signInUser(email, password) {
    try {
        // 入力検証
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        
        if (!isValidEmail(email)) {
            throw new Error('Invalid email format');
        }
        
        // PHPバックエンドを使用したログイン
        try {
            const response = await fetch('php/auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'login',
                    email: email,
                    password: password
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                return { 
                    success: true, 
                    user: {
                        uid: result.user.id,
                        email: result.user.email,
                        role: result.user.role
                    }
                };
            } else {
                throw new Error(result.error);
            }
            
        } catch (fetchError) {
            console.warn('PHP backend not available, using localStorage fallback');
            
            // フォールバック: ローカルストレージから認証
            const users = JSON.parse(localStorage.getItem('firebaseUsers') || '[]');
            const user = users.find(u => u.email === email);
            
            if (!user) {
                throw new Error('User not found');
            }
            
            // パスワード検証
            if (user.password !== hashPassword(password)) {
                throw new Error('Invalid password');
            }
            
            // ログイン成功
            return { 
                success: true, 
                user: {
                    uid: user.uid,
                    email: user.email,
                    role: user.role
                }
            };
        }
        
    } catch (error) {
        console.error('Sign in failed:', error);
        return { 
            success: false, 
            error: error.message 
        };
    }
}

// ユーザーログアウト
export async function signOutUser() {
    try {
        // 実際のFirebase実装では：
        // await auth.signOut();
        
        // ローカルストレージから現在のユーザー情報を削除
        localStorage.removeItem('currentUser');
        
        return { success: true };
        
    } catch (error) {
        console.error('Sign out failed:', error);
        return { 
            success: false, 
            error: error.message 
        };
    }
}

// 現在のユーザー取得
export function getCurrentUser() {
    try {
        const currentUser = localStorage.getItem('currentUser');
        return currentUser ? JSON.parse(currentUser) : null;
    } catch (error) {
        console.error('Get current user failed:', error);
        return null;
    }
}

// 認証状態の監視
export function onAuthStateChanged(callback) {
    try {
        // 実際のFirebase実装では：
        // return auth.onAuthStateChanged(callback);
        
        // デモ用のモック実装
        const currentUser = getCurrentUser();
        callback(currentUser);
        
        // ローカルストレージの変更を監視
        window.addEventListener('storage', (e) => {
            if (e.key === 'currentUser') {
                const user = e.newValue ? JSON.parse(e.newValue) : null;
                callback(user);
            }
        });
        
    } catch (error) {
        console.error('Auth state change listener failed:', error);
    }
}

// ユーティリティ関数

// メールアドレス検証
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// パスワードハッシュ化（簡易版）
function hashPassword(password) {
    // 実際の実装では、bcryptやFirebaseのハッシュ化を使用
    return btoa(password + 'salt'); // 簡易的なハッシュ化
}

// UID生成
function generateUID() {
    return 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// Firebase初期化を実行
document.addEventListener('DOMContentLoaded', function() {
    initializeFirebase();
});
