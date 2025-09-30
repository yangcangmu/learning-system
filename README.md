# Learning System - Web-based Learning Management System

## Project Overview
A simplified web-based learning system developed for CT050-3-2-WAPP (Web Applications) assignment. This system demonstrates the implementation of HTML5, CSS, client/server-side scripting, and database integration concepts.

## Features

### Visitor Module
- Browse learning resources without registration
- View resource categories and descriptions
- Access to public learning materials

### Registered Member Module
- User registration and login system
- Personal dashboard with bookmarks and notes
- Goal setting and tracking
- Resource bookmarking functionality

### Administrator Module
- User management (CRUD operations)
- Resource management (CRUD operations)
- System statistics and monitoring
- Admin-only access controls

## Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic markup and modern elements
- **CSS3**: External stylesheets, internal styles, responsive design
- **JavaScript**: Client-side validation, dynamic content, localStorage
- **Responsive Design**: Mobile-friendly interface

### Backend Technologies
- **Firebase Authentication**: Secure user authentication and management
- **Cloud Firestore**: NoSQL database for real-time data storage
- **PHP** (Optional): Server-side scripting for additional features
- **MySQL** (Optional): Relational database option
- **Security**: Firebase security rules, password hashing

### Key Features
- Form validation (client-side and server-side)
- CRUD operations for users and resources
- Session management and authentication
- Data persistence using localStorage
- Responsive design for all devices

## File Structure
```
learning_system/
├── index.html              # Homepage
├── login.html              # User login page (Firebase統合済み)
├── register.html           # User registration page (Firebase統合済み)
├── resources.html          # Learning resources page
├── dashboard.html          # User dashboard (Firebase統合済み)
├── admin.html              # Administrator panel (Firebase統合済み)
├── css/
│   └── style.css           # External CSS styles
├── js/
│   ├── firebase-config.js  # 🔥 Firebase設定ファイル
│   ├── firebase-auth.js    # Firebase認証モジュール
│   ├── main.js             # Main JavaScript functions
│   ├── validation.js       # Form validation
│   └── admin.js            # Admin-specific functions
├── php/ (Optional)
│   ├── config.php          # Database configuration
│   ├── auth.php            # Authentication logic
│   └── ...                 # Other PHP files
├── database/
│   └── schema.sql          # Database schema
├── FIREBASE_SETUP.md       # 🔥 Firebase詳細セットアップガイド
├── SETUP.md                # 一般的なセットアップガイド
└── README.md               # This file
```

## 🔥 Firebase Setup (推奨)

### ステップ1: Firebaseプロジェクトの作成
1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 新しいプロジェクトを作成
3. Webアプリを追加して設定情報を取得

### ステップ2: Firebase Authentication を有効化
1. Authentication → Sign-in method
2. 「メール/パスワード」を有効化

### ステップ3: Cloud Firestore を有効化
1. Firestore Database を作成
2. テストモードで開始（開発用）

### ステップ4: 設定ファイルを更新
Firebase設定情報を以下のファイルに追加：
- `login.html`
- `register.html`
- `dashboard.html`
- `admin.html`
- `js/firebase-config.js`

**詳細な手順は `FIREBASE_SETUP.md` を参照してください**

---

## Setup Instructions (従来の方法)

### Option 1: Firebase（推奨・簡単）
1. `FIREBASE_SETUP.md` の手順に従ってFirebaseをセットアップ
2. ブラウザで `index.html` を開く
3. すぐに使用可能！

### Option 2: Local Development with PHP/MySQL
1. Install XAMPP or WAMP
2. Copy project folder to `htdocs` directory
3. Start Apache and MySQL services
4. Access via `http://localhost/learning_system/`

### Option 3: Direct File Access
1. Open `index.html` directly in web browser
2. Note: Some features may be limited without server environment

## 🔥 Authentication System (Firebase)

### Firebase Authentication
このプロジェクトは**Firebase Authentication**を使用しています：
- ✅ セキュアなユーザー認証（メール/パスワード）
- ✅ Cloud Firestoreでのデータ管理
- ✅ リアルタイムの認証状態管理
- ✅ ロールベースのアクセス制御（admin/user）

### Security Features
- **Firebase Security**: Googleの堅牢なセキュリティインフラ
- **No Hardcoded Credentials**: すべての認証情報はFirebaseで管理
- **Firestore Security Rules**: データアクセスの厳格な制御
- **Input Validation**: クライアント側およびサーバー側の検証
- **Session Management**: Firebaseの自動セッション管理

### Demo Accounts
Firebase Authenticationで作成するテストアカウント：
- **管理者**: admin@example.com / admin123
- **一般ユーザー**: user@example.com / user123

**注意**: これらのアカウントは`FIREBASE_SETUP.md`の手順に従ってFirebaseコンソールで作成してください。

### New User Registration
- `register.html` から新規アカウント作成
- Firebase Authenticationに自動登録
- Firestoreにユーザー情報が保存される
- デフォルトでは「user」ロールが付与される

## System Requirements

### Minimum Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Local storage support

### For Full Functionality (Firebase)
- Firebase アカウント（無料）
- インターネット接続
- Firebase設定の完了（`FIREBASE_SETUP.md`参照）

### For Full Functionality (PHP/MySQL - Optional)
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache web server

## Features Demonstration

### User Registration & Login
- Form validation with real-time feedback
- Password strength checking
- Email format validation
- Username availability checking

### Resource Management
- Browse learning resources by category
- Search and filter functionality
- Bookmark resources for later access
- Responsive grid layout

### Personal Dashboard
- View bookmarked resources
- Create and manage personal notes
- Set and track learning goals
- Quick statistics overview

### Admin Panel
- User management (view, edit, delete)
- Resource management (CRUD operations)
- System statistics and monitoring
- Bulk operations support

## Technical Highlights

### HTML5 Features
- Semantic elements (header, nav, main, section, article)
- Form validation attributes
- Accessibility features
- Modern markup structure

### CSS3 Features
- Flexbox and Grid layouts
- CSS animations and transitions
- Responsive design with media queries
- Custom properties (CSS variables)

### JavaScript Features
- ES6+ syntax and features
- DOM manipulation and event handling
- Local storage for data persistence
- Form validation and user feedback
- Dynamic content generation

### Security Features
- **No Hardcoded Credentials**: All authentication through secure database storage
- **Password Hashing**: Secure password hashing using PHP's password_hash()
- **SQL Injection Prevention**: All database queries use prepared statements
- **Input Sanitization**: Comprehensive input validation and sanitization
- **Session Management**: Secure session handling with proper security headers
- **CORS Protection**: Proper CORS headers for API security

## Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Assignment Compliance

This project fulfills all requirements for CT050-3-2-WAPP:

✅ **Website Structure**: 6+ interlinked webpages
✅ **HTML5 Elements**: Proper and varied use of semantic elements
✅ **CSS Styling**: External CSS + internal styles
✅ **Navigation System**: Clear and usable navigation
✅ **Database Integration**: CRUD operations with two tables (Users, Resources)
✅ **Form Validation**: Client-side and server-side validation
✅ **User Roles**: Visitor, Member, Administrator modules
✅ **Responsive Design**: Mobile-friendly interface

## Future Enhancements
- Real-time notifications
- Advanced search functionality
- Progress tracking and analytics
- File upload capabilities
- Email notifications
- Social learning features

## 🎯 Assignment Completion Status

✅ **All Requirements Met**:
- Website Structure: 6+ interlinked webpages ✅
- HTML5 Elements: Proper semantic markup ✅
- CSS Styling: External + internal styles ✅
- Navigation System: Clear and usable ✅
- Database Integration: CRUD operations with Users and Resources tables ✅
- Form Validation: Client-side and server-side ✅
- User Roles: Visitor, Member, Administrator modules ✅
- Responsive Design: Mobile-friendly interface ✅
- **Security**: No hardcoded credentials, proper authentication ✅

## 🚀 Quick Start

### 方法1: Firebase（推奨）

1. **Firebase設定**:
   ```bash
   # FIREBASE_SETUP.md の手順に従ってセットアップ
   ```

2. **設定ファイルを更新**:
   - Firebase設定情報を各HTMLファイルに追加
   - `js/firebase-config.js` も更新

3. **ブラウザで開く**:
   ```bash
   # index.html をブラウザで開く
   ```

4. **テストアカウント作成**:
   - Firebaseコンソールで管理者アカウントを作成
   - または `register.html` から新規登録

### 方法2: ローカル開発（PHP/MySQL）

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/learning-system.git
   cd learning-system
   ```

2. **XAMPP/WAMPで起動**:
   - `htdocs` にコピー
   - Apache と MySQL を起動
   - `http://localhost/learning_system/` にアクセス

3. **Test authentication**:
   - Demo accounts: `admin@example.com` / `admin123` (admin)
   - Demo accounts: `user@example.com` / `user123` (user)
   - Or register new account

## 📁 Project Structure
```
learning_system/
├── index.html              # Homepage
├── login.html              # User login
├── register.html           # User registration
├── dashboard.html          # User dashboard
├── admin.html              # Admin panel
├── resources.html          # Learning resources
├── css/style.css           # Main stylesheet
├── js/                     # JavaScript modules
├── php/                    # Backend API
├── database/schema.sql     # Database schema
└── README.md               # This file
```

## Contact
For questions or issues, please refer to the assignment documentation or contact the development team.

---
**Assignment**: CT050-3-2-WAPP - Web Applications  
**Level**: 2  
**Intake**: 2025  
**Status**: ✅ COMPLETED



