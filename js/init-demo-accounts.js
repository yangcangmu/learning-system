// デモアカウントの初期化スクリプト
// このファイルはFirebase認証システムにデモアカウントを作成します

import { createUser } from './firebase-auth.js';

// デモアカウントの初期化
export async function initializeDemoAccounts() {
    try {
        console.log('Initializing demo accounts...');
        
        // デモアカウントの定義
        const demoAccounts = [
            {
                email: 'admin@example.com',
                password: 'admin123',
                role: 'admin'
            },
            {
                email: 'user@example.com',
                password: 'user123',
                role: 'user'
            }
        ];
        
        // 各デモアカウントを作成
        for (const account of demoAccounts) {
            try {
                const result = await createUser(account.email, account.password);
                
                if (result.success) {
                    // ユーザーのロールを更新
                    const users = JSON.parse(localStorage.getItem('firebaseUsers') || '[]');
                    const userIndex = users.findIndex(u => u.email === account.email);
                    
                    if (userIndex !== -1) {
                        users[userIndex].role = account.role;
                        localStorage.setItem('firebaseUsers', JSON.stringify(users));
                        console.log(`Demo account created: ${account.email} (${account.role})`);
                    }
                } else {
                    console.log(`Demo account already exists: ${account.email}`);
                }
            } catch (error) {
                console.error(`Failed to create demo account ${account.email}:`, error);
            }
        }
        
        console.log('Demo accounts initialization completed');
        return true;
        
    } catch (error) {
        console.error('Demo accounts initialization failed:', error);
        return false;
    }
}

// ページ読み込み時にデモアカウントを初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing demo accounts...');
    
    // デモアカウントが既に存在するかチェック
    const existingUsers = JSON.parse(localStorage.getItem('firebaseUsers') || '[]');
    
    console.log('Existing users:', existingUsers.length);
    
    if (existingUsers.length === 0) {
        console.log('No existing users, creating demo accounts...');
        initializeDemoAccounts();
    } else {
        console.log('Demo accounts already exist');
    }
});
