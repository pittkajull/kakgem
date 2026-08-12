<?php
$filename = $_GET['file'] ?? '';
if (!preg_match('/^[a-f0-9]{32}\.(jpg|png|webp|gif)$/', $filename)) {
    http_response_code(404);
    exit;
}

$path = '/var/www/data/article-images/' . $filename;
if (!is_file($path)) {
    http_response_code(404);
    exit;
}

$mime = mime_content_type($path) ?: 'application/octet-stream';
header('Content-Type: ' . $mime);
header('Cache-Control: public, max-age=31536000, immutable');
readfile($path);
