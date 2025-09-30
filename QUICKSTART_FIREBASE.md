# 🚀 Firebase クイックスタート

## 5分でFirebaseをセットアップ！

### ステップ1: Firebaseプロジェクト作成（2分）

1. **https://console.firebase.google.com/** を開く
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例: `learning-system`）
4. Googleアナリティクスは**無効でOK**
5. 「プロジェクトを作成」→完了を待つ

---

### ステップ2: Webアプリ登録（1分）

1. プロジェクトダッシュボードで **`</>`** アイコンをクリック
2. アプリのニックネーム: `learning-system-web`
3. 「アプリを登録」をクリック
4. **設定情報をコピー**（後で使います）

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

---

### ステップ3: Authentication有効化（30秒）

1. 左メニュー → **「Authentication」**
2. 「始める」をクリック
3. 「メール/パスワード」を選択
4. トグルを**ON**にする
5. 「保存」

✅ 認証機能が有効になりました！

---

### ステップ4: Firestore有効化（30秒）

1. 左メニュー → **「Firestore Database」**
2. 「データベースを作成」
3. **「テストモードで開始」**を選択
4. ロケーション: `asia-northeast1`（東京）
5. 「有効にする」

✅ データベースが作成されました！

---

### ステップ5: 設定をコピー（1分）

ステップ2でコピーした設定を、以下の**5つのファイル**に貼り付けます：

#### 📝 編集するファイル：
1. `login.html`（130行目付近）
2. `register.html`（140行目付近）
3. `dashboard.html`（400行目付近）
4. `admin.html`（235行目付近）
5. `js/firebase-config.js`（10行目付近）

#### 🔍 探すコード：
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",          // ← ここを変更
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    // ...
};
```

#### ✏️ 置き換え例：
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC1234567890abcdefg",
    authDomain: "learning-system-12345.firebaseapp.com",
    projectId: "learning-system-12345",
    storageBucket: "learning-system-12345.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};
```

---

### ステップ6: テストアカウント作成（30秒）

#### 管理者アカウント:
1. Firebase Console → **Authentication** → **Users**
2. 「ユーザーを追加」
3. メール: `admin@example.com`
4. パスワード: `admin123`
5. 「ユーザーを追加」
6. **UIDをコピー**（例: `abc123def456...`）

#### Firestoreにロール追加:
1. Firebase Console → **Firestore Database**
2. 「コレクションを開始」
3. コレクションID: `users`
4. ドキュメントID: **先ほどコピーしたUID**
5. フィールド追加:
   - `email` (string): `admin@example.com`
   - `role` (string): `admin`
   - `created_at` (string): `2025-01-01T00:00:00.000Z`
6. 「保存」

---

## ✅ 完了！テストしましょう

### 動作確認:

1. **接続テスト**:
   ```
   firebase-test.html をブラウザで開く
   → すべて ✅ になればOK！
   ```

2. **ログインテスト**:
   ```
   login.html を開く
   → admin@example.com / admin123 でログイン
   ```

3. **新規登録テスト**:
   ```
   register.html を開く
   → 新しいアカウントを作成
   ```

---

## 🎉 使用開始

すべて正常に動作していれば：
- ✅ ユーザー登録が可能
- ✅ ログイン/ログアウトが可能
- ✅ データがFirestoreに保存される
- ✅ 管理者/一般ユーザーの権限管理

---

## ❓ エラーが出たら

### "Firebase初期化エラー"
→ `firebaseConfig` の値が正しいか確認

### "permission-denied"
→ Firestoreのセキュリティルールを確認
→ テストモードで開始したか確認

### "auth/user-not-found"
→ Firebaseコンソールでユーザーが作成されているか確認

### その他
→ ブラウザのコンソール（F12）でエラーを確認
→ `FIREBASE_SETUP.md` の詳細ガイドを参照

---

## 📚 次のステップ

1. セキュリティルールの強化（`FIREBASE_SETUP.md`参照）
2. 追加機能の実装
3. データ構造の設計

---

**詳細な手順は `FIREBASE_SETUP.md` を参照してください。**
