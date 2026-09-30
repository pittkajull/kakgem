<?php

session_start();
header('Content-Type: application/json; charset=utf-8');

$dataDir = '/var/www/data';
$dataFile = $dataDir . '/site-content.json';

if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

function requireAdmin() {
    if (empty($_SESSION['is_admin'])) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
        exit;
    }
}

function readContent($file) {
    if (!is_file($file)) return null;
    $decoded = json_decode(file_get_contents($file), true);
    return is_array($decoded) ? $decoded : null;
}

function writeContent($file, $content) {
    $tmp = $file . '.tmp';
    $json = json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false || file_put_contents($tmp, $json, LOCK_EX) === false || !rename($tmp, $file)) {
        @unlink($tmp);
        return false;
    }
    @chmod($file, 0664);
    return true;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['admin']) && $_GET['admin'] === '1') requireAdmin();
    echo json_encode(['ok' => true, 'content' => readContent($dataFile)]);
    exit;
}

if ($method === 'PUT') {
    requireAdmin();
    $raw = file_get_contents('php://input');
    $payload = json_decode($raw ?: '{}', true);
    $content = $payload['content'] ?? null;
    if (!is_array($content)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Konten situs tidak valid.']);
        exit;
    }
    if (!writeContent($dataFile, $content)) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Konten situs gagal disimpan.']);
        exit;
    }
    echo json_encode(['ok' => true, 'content' => $content]);
    exit;
}

http_response_code(405);
echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
