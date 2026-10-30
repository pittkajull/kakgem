<?php
/** Article API. Scheduled articles are promoted on every read, so publishing
 * does not depend on a browser window staying open. */
session_start();
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
date_default_timezone_set('Asia/Jakarta');

$dataDir = '/var/www/data';
$dataFile = $dataDir . '/articles.json';
if (!is_dir($dataDir)) mkdir($dataDir, 0755, true);
if (!is_file($dataFile)) file_put_contents($dataFile, '[]', LOCK_EX);

function readArticles($file) { return json_decode(@file_get_contents($file), true) ?: []; }
function writeArticles($file, $articles) { return file_put_contents($file, json_encode(array_values($articles), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX) !== false; }
function articleIndex($articles, $id) { foreach ($articles as $i => $article) if (isset($article['id']) && (string) $article['id'] === (string) $id) return $i; return -1; }
function requireAdmin() { if (empty($_SESSION['is_admin'])) { http_response_code(403); echo json_encode(['ok'=>false, 'error'=>'Unauthorized']); exit; } }
function clean($value, $fallback = '') { $value = trim((string) $value); return $value === '' ? $fallback : $value; }
function validSchedule($value) { if (!$value) return null; try { $date = new DateTimeImmutable($value, new DateTimeZone('Asia/Jakarta')); return $date->format(DateTimeInterface::ATOM); } catch (Throwable $e) { return null; } }
function promoteDue(&$articles) {
    $now = new DateTimeImmutable('now', new DateTimeZone('Asia/Jakarta')); $changed = false;
    foreach ($articles as &$article) {
        if (($article['status'] ?? '') !== 'scheduled' || empty($article['scheduledAt'])) continue;
        try { $scheduled = new DateTimeImmutable($article['scheduledAt']); } catch (Throwable $e) { continue; }
        if ($scheduled <= $now) { $article['status'] = 'published'; $article['publishedAt'] = $scheduled->format(DateTimeInterface::ATOM); $article['scheduledAt'] = null; $article['updatedAt'] = $now->format(DateTimeInterface::ATOM); $changed = true; }
    } unset($article); return $changed;
}
function normalizeStatus($requested, $scheduledAt = null) { if ($requested === 'published') return 'published'; if ($requested === 'scheduled' && $scheduledAt) return 'scheduled'; return 'draft'; }

$method = $_SERVER['REQUEST_METHOD'];
$articles = readArticles($dataFile);
if (promoteDue($articles)) writeArticles($dataFile, $articles);

if ($method === 'GET') {
    $isAdmin = ($_GET['admin'] ?? '') === '1'; if ($isAdmin) requireAdmin();
    if (!$isAdmin) $articles = array_values(array_filter($articles, fn($article) => ($article['status'] ?? 'published') === 'published'));
    usort($articles, fn($a, $b) => strcmp((string) ($b['publishedAt'] ?? $b['scheduledAt'] ?? $b['updatedAt'] ?? ''), (string) ($a['publishedAt'] ?? $a['scheduledAt'] ?? $a['updatedAt'] ?? '')));
    echo json_encode(['ok'=>true, 'articles'=>$articles]); exit;
}
requireAdmin();
$data = json_decode(file_get_contents('php://input') ?: '{}', true) ?: ($_POST ?: []);
if (!in_array($method, ['POST', 'PUT', 'DELETE'], true)) { http_response_code(405); echo json_encode(['ok'=>false, 'error'=>'Method not allowed']); exit; }
$deleteRequest = $method === 'DELETE' || ($method === 'POST' && ($_GET['action'] ?? '') === 'delete');
if ($deleteRequest) { $index = articleIndex($articles, $data['id'] ?? null); if ($index < 0) { http_response_code(404); echo json_encode(['ok'=>false, 'error'=>'Artikel tidak ditemukan.']); exit; } array_splice($articles, $index, 1); if (!writeArticles($dataFile, $articles)) { http_response_code(500); echo json_encode(['ok'=>false, 'error'=>'Data artikel tidak dapat ditulis ke server.']); exit; } echo json_encode(['ok'=>true, 'deletedId'=>$data['id']]); exit; }

$id = $data['id'] ?? null; $current = null;
$action = $_GET['action'] ?? '';
$updateRequest = $method === 'PUT' || ($method === 'POST' && in_array($action, ['update', 'schedule'], true));
if ($updateRequest) { $index = articleIndex($articles, $id); if ($index < 0) { http_response_code(404); echo json_encode(['ok'=>false, 'error'=>'Artikel tidak ditemukan.']); exit; } $current = $articles[$index]; }
$title = clean($data['title'] ?? ($current['title'] ?? ''));
$content = clean($data['content'] ?? ($current['content'] ?? ''));
if (!$title || !$content) { http_response_code(400); echo json_encode(['ok'=>false, 'error'=>'Judul dan isi artikel wajib diisi.']); exit; }
$requested = $action === 'schedule' ? 'scheduled' : ($data['status'] ?? ($current['status'] ?? 'draft'));
$scheduledAt = validSchedule($data['scheduledAt'] ?? ($current['scheduledAt'] ?? null));
if ($requested === 'scheduled' && !$scheduledAt) { http_response_code(400); echo json_encode(['ok'=>false, 'error'=>'Tanggal dan jam terbit wajib diisi untuk artikel terjadwal.']); exit; }
$status = normalizeStatus($requested, $scheduledAt); $now = (new DateTimeImmutable('now', new DateTimeZone('Asia/Jakarta')))->format(DateTimeInterface::ATOM);
$article = array_merge($current ?: [], [
    'id' => $current['id'] ?? ($id ?: (int) (microtime(true) * 1000)), 'title'=>$title,
    'excerpt'=>trim((string) ($data['excerpt'] ?? ($current['excerpt'] ?? ''))), 'content'=>$content,
    'category'=>clean($data['category'] ?? ($current['category'] ?? ''), 'Kabar Kagama Digi'),
    'image'=>trim((string) ($data['image'] ?? ($current['image'] ?? ''))), 'author'=>clean($data['author'] ?? ($current['author'] ?? ''), 'Kagama Digi'),
    'status'=>$status, 'scheduledAt'=>$status === 'scheduled' ? $scheduledAt : null,
    'publishedAt'=>$status === 'published' ? ($current['publishedAt'] ?? $now) : null, 'updatedAt'=>$now,
]);
if (!$updateRequest) array_unshift($articles, $article); else $articles[$index] = $article;
if (!writeArticles($dataFile, $articles)) { http_response_code(500); echo json_encode(['ok'=>false, 'error'=>'Data artikel tidak dapat ditulis ke server.']); exit; }
echo json_encode(['ok'=>true, 'article'=>$article]);
