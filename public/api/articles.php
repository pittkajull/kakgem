<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

$dataDir = '/var/www/data';
$dataFile = $dataDir . '/articles.json';

if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}
if (!is_file($dataFile)) {
    file_put_contents($dataFile, '[]');
}

function readArticles($file) {
    return json_decode(file_get_contents($file), true) ?: [];
}

function writeArticles($file, $articles) {
    file_put_contents($file, json_encode(array_values($articles), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function articleIndex($articles, $id) {
    foreach ($articles as $index => $article) {
        if (isset($article['id']) && (string) $article['id'] === (string) $id) return $index;
    }
    return -1;
}

function requireAdmin() {
    if (empty($_SESSION['is_admin'])) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
        exit;
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$articles = readArticles($dataFile);

if ($method === 'GET') {
    $isAdmin = isset($_GET['admin']) && $_GET['admin'] === '1';
    if ($isAdmin) requireAdmin();
    if (!$isAdmin) {
        $articles = array_values(array_filter($articles, function ($article) {
            return ($article['status'] ?? 'published') === 'published';
        }));
    }
    usort($articles, function ($a, $b) {
        return strcmp((string) ($b['publishedAt'] ?? $b['updatedAt'] ?? ''), (string) ($a['publishedAt'] ?? $a['updatedAt'] ?? ''));
    });
    echo json_encode(['ok' => true, 'articles' => $articles]);
    exit;
}

requireAdmin();
$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '{}', true);

if ($method === 'POST') {
    if (empty(trim($data['title'] ?? '')) || empty(trim($data['content'] ?? ''))) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Judul dan isi artikel wajib diisi.']);
        exit;
    }
    $now = date('c');
    $article = [
        'id' => $data['id'] ?? (int) (microtime(true) * 1000),
        'title' => trim($data['title']),
        'excerpt' => trim($data['excerpt'] ?? ''),
        'content' => trim($data['content']),
        'category' => trim($data['category'] ?? 'Kabar Kagama Digi'),
        'image' => trim($data['image'] ?? ''),
        'author' => trim($data['author'] ?? 'Kagama Digi'),
        'status' => ($data['status'] ?? 'draft') === 'published' ? 'published' : 'draft',
        'publishedAt' => (($data['status'] ?? 'draft') === 'published') ? ($data['publishedAt'] ?? $now) : null,
        'updatedAt' => $now,
    ];
    array_unshift($articles, $article);
    writeArticles($dataFile, $articles);
    echo json_encode(['ok' => true, 'article' => $article]);
    exit;
}

if ($method === 'PUT') {
    $id = $data['id'] ?? null;
    $index = articleIndex($articles, $id);
    if ($index < 0) {
        http_response_code(404);
        echo json_encode(['ok' => false, 'error' => 'Artikel tidak ditemukan.']);
        exit;
    }
    $current = $articles[$index];
    $status = ($data['status'] ?? $current['status'] ?? 'draft') === 'published' ? 'published' : 'draft';
    $articles[$index] = array_merge($current, [
        'title' => trim($data['title'] ?? $current['title']),
        'excerpt' => trim($data['excerpt'] ?? $current['excerpt'] ?? ''),
        'content' => trim($data['content'] ?? $current['content']),
        'category' => trim($data['category'] ?? $current['category'] ?? 'Kabar Kagama Digi'),
        'image' => trim($data['image'] ?? $current['image'] ?? ''),
        'author' => trim($data['author'] ?? $current['author'] ?? 'Kagama Digi'),
        'status' => $status,
        'publishedAt' => $status === 'published' ? ($current['publishedAt'] ?? date('c')) : null,
        'updatedAt' => date('c'),
    ]);
    writeArticles($dataFile, $articles);
    echo json_encode(['ok' => true, 'article' => $articles[$index]]);
    exit;
}

if ($method === 'DELETE') {
    $index = articleIndex($articles, $data['id'] ?? null);
    if ($index < 0) {
        http_response_code(404);
        echo json_encode(['ok' => false, 'error' => 'Artikel tidak ditemukan.']);
        exit;
    }
    array_splice($articles, $index, 1);
    writeArticles($dataFile, $articles);
    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
