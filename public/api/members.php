<?php
session_start();
header('Content-Type: application/json');

$dataFile = '/var/www/data/members.json';

if (!is_dir('/var/www/data')) {
    mkdir('/var/www/data', 0755, true);
}

if (!is_file($dataFile)) {
    file_put_contents($dataFile, '[]');
}

$method = $_SERVER['REQUEST_METHOD'];

function readMembers($file) {
    return json_decode(file_get_contents($file), true) ?: [];
}

function writeMembers($file, $members) {
    file_put_contents($file, json_encode($members, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function findIndex($members, $id) {
    foreach ($members as $i => $m) {
        if (isset($m['id']) && (string)$m['id'] === (string)$id) return $i;
        if (isset($m['email']) && $m['email'] === $id) return $i;
    }
    return -1;
}

if ($method === 'GET') {
    if (empty($_SESSION['is_admin'])) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
        exit;
    }
    $members = readMembers($dataFile);
    echo json_encode(['ok' => true, 'members' => $members]);
    exit;
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '{}', true);
    if (empty($data['name']) || empty($data['email'])) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Nama dan email wajib diisi.']);
        exit;
    }
    $members = readMembers($dataFile);
    $newMember = [
        'id' => $data['id'] ?? (int)(microtime(true) * 1000),
        'name' => $data['name'] ?? '',
        'email' => $data['email'] ?? '',
        'study' => $data['study'] ?? '',
        'faculty' => $data['faculty'] ?? '',
        'year' => $data['year'] ?? '',
        'phone' => $data['phone'] ?? '',
        'domicile' => $data['domicile'] ?? '',
        'division' => $data['division'] ?? '',
    ];
    array_unshift($members, $newMember);
    writeMembers($dataFile, $members);
    echo json_encode(['ok' => true]);
    exit;
}

if ($method === 'PUT') {
    if (empty($_SESSION['is_admin'])) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
        exit;
    }
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '{}', true);
    $target = $data['target'] ?? null;
    $updates = $data['updates'] ?? null;
    if (!$target || !$updates) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Target dan updates wajib diisi.']);
        exit;
    }
    $members = readMembers($dataFile);
    $idx = findIndex($members, $target);
    if ($idx < 0) {
        http_response_code(404);
        echo json_encode(['ok' => false, 'error' => 'Anggota tidak ditemukan.']);
        exit;
    }
    $members[$idx] = array_merge($members[$idx], $updates);
    writeMembers($dataFile, $members);
    echo json_encode(['ok' => true]);
    exit;
}

if ($method === 'DELETE') {
    if (empty($_SESSION['is_admin'])) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
        exit;
    }
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '{}', true);
    $target = $data['target'] ?? null;
    if (!$target) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Target wajib diisi.']);
        exit;
    }
    $members = readMembers($dataFile);
    $idx = findIndex($members, $target);
    if ($idx < 0) {
        http_response_code(404);
        echo json_encode(['ok' => false, 'error' => 'Anggota tidak ditemukan.']);
        exit;
    }
    array_splice($members, $idx, 1);
    writeMembers($dataFile, $members);
    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
