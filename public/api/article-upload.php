<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

if (empty($_SESSION['is_admin'])) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'File gambar wajib dipilih.']);
    exit;
}

$file = $_FILES['image'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Upload gambar gagal.']);
    exit;
}
if ($file['size'] > 5 * 1024 * 1024) {
    http_response_code(413);
    echo json_encode(['ok' => false, 'error' => 'Ukuran gambar maksimal 5 MB.']);
    exit;
}

$info = @getimagesize($file['tmp_name']);
$allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
$mime = $info['mime'] ?? '';
if (!$info || !isset($allowed[$mime])) {
    http_response_code(415);
    echo json_encode(['ok' => false, 'error' => 'Format yang didukung: JPG, PNG, WEBP, atau GIF.']);
    exit;
}

$dir = '/var/www/data/article-images';
if (!is_dir($dir)) mkdir($dir, 0755, true);
$filename = bin2hex(random_bytes(16)) . '.' . $allowed[$mime];
$target = $dir . '/' . $filename;
if (!move_uploaded_file($file['tmp_name'], $target)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Gambar tidak dapat disimpan di server.']);
    exit;
}

echo json_encode(['ok' => true, 'url' => '/api/article-image.php?file=' . rawurlencode($filename)]);
