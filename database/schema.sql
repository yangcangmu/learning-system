-- Learning System Database Schema
-- このファイルはデータベースのスキーマを定義します

-- データベース作成
CREATE DATABASE IF NOT EXISTS learning_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE learning_system;

-- ユーザーテーブル
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- 学習リソーステーブル
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
);

-- ユーザーブックマークテーブル
CREATE TABLE IF NOT EXISTS user_bookmarks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    resource_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    UNIQUE KEY unique_bookmark (user_id, resource_id)
);

-- ユーザーノートテーブル
CREATE TABLE IF NOT EXISTS user_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

-- ユーザー目標テーブル
CREATE TABLE IF NOT EXISTS user_goals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    deadline DATE,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_deadline (deadline)
);

-- デモデータの挿入
INSERT INTO users (email, password_hash, role) VALUES
('admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('user@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user')
ON DUPLICATE KEY UPDATE email=email;

-- デモリソースの挿入
INSERT INTO resources (title, description, category, url, type, created_by) VALUES
('Introduction to HTML', 'Learn the basics of HTML markup language', 'Web Development', 'https://example.com/html-intro', 'video', 1),
('CSS Fundamentals', 'Master CSS styling and layout techniques', 'Web Development', 'https://example.com/css-fundamentals', 'article', 1),
('JavaScript Basics', 'Introduction to JavaScript programming', 'Programming', 'https://example.com/js-basics', 'video', 1),
('Python Programming', 'Learn Python from scratch', 'Programming', 'https://example.com/python-intro', 'document', 1),
('Database Design', 'Database design principles and best practices', 'Database', 'https://example.com/db-design', 'article', 1),
('Web Development', 'Complete web development course', 'Web Development', 'https://example.com/web-dev', 'link', 1)
ON DUPLICATE KEY UPDATE title=title;

-- インデックスの最適化
CREATE INDEX idx_resources_category_type ON resources(category, type);
CREATE INDEX idx_user_bookmarks_user_resource ON user_bookmarks(user_id, resource_id);
CREATE INDEX idx_user_notes_user_created ON user_notes(user_id, created_at);
CREATE INDEX idx_user_goals_user_deadline ON user_goals(user_id, deadline);
