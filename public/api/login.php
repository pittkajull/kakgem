<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$configFile = __DIR__ . '/admin-config.php';
if (!is_file($configFile)) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['ok' => false, 'error' => 'Konfigurasi admin belum diatur.']);
    exit;
}

$config = require $configFile;

session_start();

$maxAttempts = 5;
$lockMinutes = 10;
$now = time();

if (!isset($_SESSION['admin_fails'])) {
    $_SESSION['admin_fails'] = ['count' => 0, 'locked_until' => 0];
}
$state = &$_SESSION['admin_fails'];

if ($now < $state['locked_until']) {
    $remaining = (int) ceil(($state['locked_until'] - $now) / 60);
    http_response_code(429);
    header('Content-Type: application/json');
    echo json_encode(['ok' => false, 'error' => "Terlalu banyak percobaan. Coba lagi dalam {$remaining} menit."]);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '{}', true);
$password = isset($data['password']) ? (string) $data['password'] : '';

if ($password === '') {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['ok' => false, 'error' => 'Password wajib diisi.']);
    exit;
}

if (password_verify($password, $config['password_hash'])) {
    $state['count'] = 0;
    $state['locked_until'] = 0;
    session_regenerate_id(true);
    $_SESSION['is_admin'] = true;
    header('Content-Type: application/json');
    echo json_encode(['ok' => true]);
    exit;
}

$state['count']++;
if ($state['count'] >= $maxAttempts) {
    $state['locked_until'] = $now + $lockMinutes * 60;
    $state['count'] = 0;
    http_response_code(429);
    header('Content-Type: application/json');
    echo json_encode(['ok' => false, 'error' => "Terlalu banyak percobaan gagal. Coba lagi dalam {$lockMinutes} menit."]);
    exit;
}

http_response_code(401);
header('Content-Type: application/json');
echo json_encode(['ok' => false, 'error' => 'Password salah.', 'remaining' => $maxAttempts - $state['count']]);
