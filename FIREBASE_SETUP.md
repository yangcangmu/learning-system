# 🔥 Firebase セットアップガイド

このガイドでは、Learning SystemにFirebaseを統合する手順を説明します。

## 📋 必要なもの

- Googleアカウント
- Webブラウザ
- テキストエディタ

---

## ステップ1: Firebaseプロジェクトの作成

### 1.1 Firebaseコンソールにアクセス
https://console.firebase.google.com/ にアクセスし、Googleアカウントでログインします。

### 1.2 プロジェクトを作成
1. 「プロジェクトを追加」をクリック
2. プロジェクト名を入力（例: `learning-system`）
3. Googleアナリティクスは任意（無効でもOK）
4. 「プロジェクトを作成」をクリック

---

## ステップ2: Webアプリの追加

### 2.1 アプリを登録
1. プロジェクトダッシュボードで「ウェブアプリにFirebaseを追加」(</>) アイコンをクリック
2. アプリのニックネーム（例: `learning-system-web`）を入力
3. 「Firebase Hosting」はチェック不要
4. 「アプリを登録」をクリック

### 2.2 設定情報をコピー
以下のような設定情報が表示されます：

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**この情報をコピーしてください！**

---

## ステップ3: Firebase Authentication を有効化

### 3.1 Authenticationの設定
1. 左メニューから「Authentication」をクリック
2. 「始める」または「Sign-in method」タブをクリック
3. 「メール/パスワード」を選択
4. 「有効にする」をトグルをONにする
5. 「保存」をクリック

---

## ステップ4: Cloud Firestore を有効化

### 4.1 Firestoreの設定
1. 左メニューから「Firestore Database」をクリック
2. 「データベースを作成」をクリック
3. セキュリティルールは「テストモードで開始」を選択（開発用）
4. ロケーションを選択（例: `asia-northeast1` - 東京）
5. 「有効にする」をクリック

### 4.2 セキュリティルールの設定
Firestoreのルールタブで、以下のルールを設定します：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ユーザーコレクション - 認証済みユーザーのみ自分のデータにアクセス可能
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // ノート - 認証済みユーザーのみアクセス可能
    match /notes/{noteId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

「公開」をクリックして保存します。

---

## ステップ5: プロジェクトに設定を追加

### 5.1 設定ファイルを更新

ステップ2.2でコピーした設定情報を、以下の**すべてのファイル**に貼り付けてください：

#### ファイル一覧：
- `login.html`
- `register.html`
- `dashboard.html`
- `admin.html`
- `js/firebase-config.js`

各ファイル内で以下の部分を探して、**YOUR_API_KEY_HEREなどの部分を実際の値に置き換えます**：

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",              // ← ここを置き換え
    authDomain: "your-project-id.firebaseapp.com",  // ← ここを置き換え
    projectId: "your-project-id",              // ← ここを置き換え
    storageBucket: "your-project-id.appspot.com",   // ← ここを置き換え
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // ← ここを置き換え
    appId: "YOUR_APP_ID"                       // ← ここを置き換え
};
```

---

## ステップ6: テストユーザーの作成

### 6.1 管理者アカウントを作成

1. Firebaseコンソールの「Authentication」→「Users」タブを開く
2. 「ユーザーを追加」をクリック
3. メールアドレス: `admin@example.com`
4. パスワード: `admin123`（任意のパスワード）
5. 「ユーザーを追加」をクリック

### 6.2 Firestoreにロール情報を追加

1. Firebaseコンソールの「Firestore Database」を開く
2. 「コレクションを開始」をクリック
3. コレクションID: `users`
4. 最初のドキュメント:
   - ドキュメントID: **先ほど作成したユーザーのUID**（Authenticationページでコピー）
   - フィールド:
     - `email` (string): `admin@example.com`
     - `role` (string): `admin`
     - `created_at` (string): `2025-01-01T00:00:00.000Z`
5. 「保存」をクリック

### 6.3 一般ユーザーアカウントを作成

同様に、一般ユーザーも作成します：
1. Authentication で `user@example.com` / `user123` を追加
2. Firestore の `users` コレクションに、そのユーザーのドキュメントを追加
   - ドキュメントID: 新しいユーザーのUID
   - `email`: `user@example.com`
   - `role`: `user`

---

## ステップ7: 動作確認

### 7.1 プロジェクトを開く
1. `index.html` をブラウザで開く
2. 「Register」または「Login」をクリック

### 7.2 ログインテスト
1. `login.html` で作成したアカウントでログイン
2. コンソール（F12で開く）を確認:
   - `✅ Firebase初期化成功` が表示されればOK
3. ログインが成功すると、`dashboard.html` または `admin.html` にリダイレクトされます

### 7.3 新規登録テスト
1. `register.html` で新しいアカウントを作成
2. 成功すると、Firebaseの「Authentication」と「Firestore Database」の両方にユーザーが追加されます

---

## 🎉 完了！

これでFirebaseの統合が完了しました。

## 📝 使用方法

### ユーザー登録
- `register.html` で新しいアカウントを作成
- Firebase Authentication に自動登録
- Firestore の `users` コレクションにユーザー情報が保存

### ログイン
- `login.html` でログイン
- Firebase Authentication で認証
- ロールに応じて dashboard または admin ページにリダイレクト

### データ保存
- ブックマーク、ノート、ゴールは Firestore に保存可能
- 各ユーザーごとに独立したデータ管理

---

## ❓ トラブルシューティング

### エラー: "Firebase初期化エラー"
- `firebaseConfig` の値が正しく設定されているか確認
- Firebase SDKのCDNリンクが正しく読み込まれているか確認

### エラー: "auth/user-not-found"
- Firebase Authentication にユーザーが登録されているか確認
- メールアドレスが正しいか確認

### エラー: "permission-denied"
- Firestore のセキュリティルールを確認
- ユーザーが認証されているか確認

### コンソールでエラーを確認
ブラウザで F12 を押して、コンソールタブでエラーメッセージを確認してください。

---

## 🔐 セキュリティに関する注意

### 開発環境
現在のセキュリティルールは開発用です。本番環境では、より厳格なルールを設定してください。

### 本番環境のルール例
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /notes/{noteId} {
      allow read, write: if request.auth != null 
        && resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## 📚 参考リンク

- [Firebase公式ドキュメント](https://firebase.google.com/docs)
- [Firebase Authentication ガイド](https://firebase.google.com/docs/auth)
- [Cloud Firestore ガイド](https://firebase.google.com/docs/firestore)
- [セキュリティルール入門](https://firebase.google.com/docs/firestore/security/get-started)

---

質問や問題がある場合は、Firebase公式ドキュメントを参照してください。
