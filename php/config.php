<?php
// データベース設定ファイル
// このファイルはデータベース接続の設定を管理します

// データベース設定
define('DB_HOST', 'localhost');
define('DB_NAME', 'learning_system');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// セキュリティ設定
define('JWT_SECRET', 'your-secret-key-here');
define('PASSWORD_SALT', 'your-password-salt-here');

// セッション設定
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', 0); // HTTPSの場合は1に設定

// データベース接続クラス
class Database {
    private $connection;
    
    public function __construct() {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $this->connection = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]);
        } catch (PDOException $e) {
            error_log("Database connection failed: " . $e->getMessage());
            throw new Exception("Database connection failed");
        }
    }
    
    public function getConnection() {
        return $this->connection;
    }
    
    // ユーザー認証
    public function authenticateUser($email, $password) {
        try {
            $stmt = $this->connection->prepare(
                "SELECT id, email, password_hash, role, created_at FROM users WHERE email = ?"
            );
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            
            if ($user && password_verify($password, $user['password_hash'])) {
                return [
                    'success' => true,
                    'user' => [
                        'id' => $user['id'],
                        'email' => $user['email'],
                        'role' => $user['role']
                    ]
                ];
            }
            
            return ['success' => false, 'error' => 'Invalid credentials'];
            
        } catch (PDOException $e) {
            error_log("Authentication error: " . $e->getMessage());
            return ['success' => false, 'error' => 'Authentication failed'];
        }
    }
    
    // ユーザー作成
    public function createUser($email, $password, $role = 'user') {
        try {
            // 重複チェック
            $stmt = $this->connection->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->fetch()) {
                return ['success' => false, 'error' => 'User already exists'];
            }
            
            // パスワードハッシュ化
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            
            // ユーザー作成
            $stmt = $this->connection->prepare(
                "INSERT INTO users (email, password_hash, role, created_at) VALUES (?, ?, ?, NOW())"
            );
            $stmt->execute([$email, $passwordHash, $role]);
            
            return [
                'success' => true,
                'user_id' => $this->connection->lastInsertId()
            ];
            
        } catch (PDOException $e) {
            error_log("User creation error: " . $e->getMessage());
            return ['success' => false, 'error' => 'User creation failed'];
        }
    }
    
    // ユーザー情報取得
    public function getUserById($userId) {
        try {
            $stmt = $this->connection->prepare(
                "SELECT id, email, role, created_at FROM users WHERE id = ?"
            );
            $stmt->execute([$userId]);
            return $stmt->fetch();
        } catch (PDOException $e) {
            error_log("Get user error: " . $e->getMessage());
            return false;
        }
    }
}

// レスポンス用のヘルパー関数
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// 入力検証用のヘルパー関数
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function validatePassword($password) {
    return strlen($password) >= 6;
}

// セキュリティ用のヘルパー関数
function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

// エラーログ用のヘルパー関数
function logError($message, $context = []) {
    $logMessage = date('Y-m-d H:i:s') . " - " . $message;
    if (!empty($context)) {
        $logMessage .= " - Context: " . json_encode($context);
    }
    error_log($logMessage);
}
?>
