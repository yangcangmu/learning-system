# 🚀 データベース認証システム セットアップガイド

## 📋 **前提条件**

- **XAMPP** または **WAMP** がインストールされている
- **Apache** と **MySQL** サービスが起動している

## 🔧 **セットアップ手順**

### 1. **XAMPP/WAMPの起動**
1. XAMPP Control Panel または WAMP を起動
2. **Apache** と **MySQL** サービスを開始
3. 緑色の「Running」状態になることを確認

### 2. **データベースのセットアップ**
1. ブラウザで `http://localhost/setup-database.php` にアクセス
2. 以下のメッセージが表示されることを確認：
   ```
   ✅ MySQL接続成功
   ✅ データベース 'learning_system' 作成成功
   ✅ ユーザーテーブル作成成功
   ✅ リソーステーブル作成成功
   ✅ デモユーザー作成成功
   ✅ デモリソース作成成功
   🎉 データベースセットアップ完了！
   ```

### 3. **プロジェクトの配置**
1. プロジェクトフォルダを `C:\xampp\htdocs\` または `C:\wamp64\www\` に配置
2. フォルダ名を `learning_system` に変更

### 4. **アクセステスト**
1. ブラウザで `http://localhost/learning_system/` にアクセス
2. ホームページが表示されることを確認

## 🧪 **認証テスト**

### **デモアカウント**
- **管理者**: `admin@example.com` / `admin123`
- **一般ユーザー**: `user@example.com` / `user123`

### **テスト手順**
1. **新規登録テスト**:
   - `http://localhost/learning_system/register.html` にアクセス
   - 新しいメールアドレスで登録
   - 成功するとログインページにリダイレクト

2. **ログインテスト**:
   - `http://localhost/learning_system/login.html` にアクセス
   - デモアカウントまたは新規登録したアカウントでログイン
   - 管理者は `admin.html`、一般ユーザーは `dashboard.html` にリダイレクト

## 🔍 **トラブルシューティング**

### **データベース接続エラー**
```
❌ エラー: SQLSTATE[HY000] [2002] No connection could be made because the target machine actively refused it.
```
**解決方法**: XAMPP/WAMPのMySQLサービスが起動しているか確認

### **ファイルが見つからないエラー**
```
404 Not Found
```
**解決方法**: 
- プロジェクトが正しいディレクトリに配置されているか確認
- `http://localhost/learning_system/` でアクセスしているか確認

### **PHPエラー**
```
500 Internal Server Error
```
**解決方法**: 
- `php/error.log` でエラーログを確認
- ファイルの権限を確認

## 📊 **データベース構造**

### **users テーブル**
- `id`: ユーザーID（主キー）
- `email`: メールアドレス（ユニーク）
- `password_hash`: ハッシュ化されたパスワード
- `role`: ユーザーロール（admin/user）
- `created_at`: 作成日時
- `updated_at`: 更新日時

### **resources テーブル**
- `id`: リソースID（主キー）
- `title`: タイトル
- `description`: 説明
- `category`: カテゴリ
- `url`: URL
- `type`: タイプ（video/article/document/link）
- `created_by`: 作成者ID（外部キー）
- `created_at`: 作成日時
- `updated_at`: 更新日時

## ✅ **セットアップ完了確認**

すべて正常に動作する場合：
1. ✅ データベース接続成功
2. ✅ 新規登録機能動作
3. ✅ ログイン機能動作
4. ✅ ロール別リダイレクト動作
5. ✅ セキュアな認証処理動作

これで課題要件の「データベース認証」が完全に実装されました！
