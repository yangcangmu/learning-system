<?php
// データベースセットアップスクリプト
// このファイルを実行してデータベースとテーブルを作成します

// データベース設定
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'learning_system';

try {
    // MySQLに接続
    $pdo = new PDO("mysql:host=$host", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ MySQL接続成功\n";
    
    // データベース作成
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$database` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✅ データベース '$database' 作成成功\n";
    
    // データベースを選択
    $pdo->exec("USE `$database`");
    
    // ユーザーテーブル作成
    $createUsersTable = "
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_role (role)
    )";
    $pdo->exec($createUsersTable);
    echo "✅ ユーザーテーブル作成成功\n";
    
    // 学習リソーステーブル作成
    $createResourcesTable = "
    CREATE TABLE IF NOT EXISTS resources (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        url VARCHAR(500),
        type ENUM('video', 'article', 'document', 'link') DEFAULT 'link',
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_category (category),
        INDEX idx_created_by (created_by)
    )";
    $pdo->exec($createResourcesTable);
    echo "✅ リソーステーブル作成成功\n";
    
    // デモデータの挿入
    $demoUsers = [
        ['admin@example.com', password_hash('admin123', PASSWORD_DEFAULT), 'admin'],
        ['user@example.com', password_hash('user123', PASSWORD_DEFAULT), 'user']
    ];
    
    foreach ($demoUsers as $user) {
        $stmt = $pdo->prepare("INSERT IGNORE INTO users (email, password_hash, role) VALUES (?, ?, ?)");
        $stmt->execute($user);
    }
    echo "✅ デモユーザー作成成功\n";
    
    // デモリソースの挿入
    $demoResources = [
        ['Introduction to HTML', 'Learn the basics of HTML markup language', 'Web Development', 'https://example.com/html-intro', 'video', 1],
        ['CSS Fundamentals', 'Master CSS styling and layout techniques', 'Web Development', 'https://example.com/css-fundamentals', 'article', 1],
        ['JavaScript Basics', 'Introduction to JavaScript programming', 'Programming', 'https://example.com/js-basics', 'video', 1],
        ['Python Programming', 'Learn Python from scratch', 'Programming', 'https://example.com/python-intro', 'document', 1],
        ['Database Design', 'Database design principles and best practices', 'Database', 'https://example.com/db-design', 'article', 1],
        ['Web Development', 'Complete web development course', 'Web Development', 'https://example.com/web-dev', 'link', 1]
    ];
    
    foreach ($demoResources as $resource) {
        $stmt = $pdo->prepare("INSERT IGNORE INTO resources (title, description, category, url, type, created_by) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute($resource);
    }
    echo "✅ デモリソース作成成功\n";
    
    echo "\n🎉 データベースセットアップ完了！\n";
    echo "デモアカウント:\n";
    echo "- 管理者: admin@example.com / admin123\n";
    echo "- ユーザー: user@example.com / user123\n";
    
} catch (PDOException $e) {
    echo "❌ エラー: " . $e->getMessage() . "\n";
    echo "XAMPPやWAMPが起動しているか確認してください。\n";
}
?>
