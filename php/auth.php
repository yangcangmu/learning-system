<?php
// 認証処理API
// このファイルはユーザー認証のAPIエンドポイントを提供します

require_once 'config.php';

// CORS設定
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// OPTIONSリクエストの処理
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// リクエストメソッドの確認
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

// 入力データの取得
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    sendResponse(['success' => false, 'error' => 'Invalid JSON input'], 400);
}

// アクションの確認
$action = $input['action'] ?? '';

try {
    $db = new Database();
    
    switch ($action) {
        case 'login':
            handleLogin($db, $input);
            break;
            
        case 'register':
            handleRegister($db, $input);
            break;
            
        case 'logout':
            handleLogout();
            break;
            
        default:
            sendResponse(['success' => false, 'error' => 'Invalid action'], 400);
    }
    
} catch (Exception $e) {
    logError('Authentication error', ['error' => $e->getMessage()]);
    sendResponse(['success' => false, 'error' => 'Internal server error'], 500);
}

// ログイン処理
function handleLogin($db, $input) {
    $email = sanitizeInput($input['email'] ?? '');
    $password = $input['password'] ?? '';
    
    // 入力検証
    if (empty($email) || empty($password)) {
        sendResponse(['success' => false, 'error' => 'Email and password are required'], 400);
    }
    
    if (!validateEmail($email)) {
        sendResponse(['success' => false, 'error' => 'Invalid email format'], 400);
    }
    
    // 認証処理
    $result = $db->authenticateUser($email, $password);
    
    if ($result['success']) {
        // セッション開始
        session_start();
        $_SESSION['user_id'] = $result['user']['id'];
        $_SESSION['user_email'] = $result['user']['email'];
        $_SESSION['user_role'] = $result['user']['role'];
        
        sendResponse([
            'success' => true,
            'user' => $result['user'],
            'message' => 'Login successful'
        ]);
    } else {
        sendResponse(['success' => false, 'error' => $result['error']], 401);
    }
}

// 登録処理
function handleRegister($db, $input) {
    $email = sanitizeInput($input['email'] ?? '');
    $password = $input['password'] ?? '';
    $confirmPassword = $input['confirmPassword'] ?? '';
    
    // 入力検証
    if (empty($email) || empty($password) || empty($confirmPassword)) {
        sendResponse(['success' => false, 'error' => 'All fields are required'], 400);
    }
    
    if (!validateEmail($email)) {
        sendResponse(['success' => false, 'error' => 'Invalid email format'], 400);
    }
    
    if (!validatePassword($password)) {
        sendResponse(['success' => false, 'error' => 'Password must be at least 6 characters'], 400);
    }
    
    if ($password !== $confirmPassword) {
        sendResponse(['success' => false, 'error' => 'Passwords do not match'], 400);
    }
    
    // ユーザー作成
    $result = $db->createUser($email, $password);
    
    if ($result['success']) {
        sendResponse([
            'success' => true,
            'message' => 'Registration successful',
            'user_id' => $result['user_id']
        ]);
    } else {
        sendResponse(['success' => false, 'error' => $result['error']], 400);
    }
}

// ログアウト処理
function handleLogout() {
    session_start();
    session_destroy();
    
    sendResponse([
        'success' => true,
        'message' => 'Logout successful'
    ]);
}
?>
