import * as SQLite from 'expo-sqlite';

// Abre o banco uma única vez e reaproveita a mesma conexão no app inteiro.
let databasePromise = null;

export function getDatabase() {
  if (!databasePromise) {
    databasePromise = openAndCreateTables();
  }
  return databasePromise;
}

async function openAndCreateTables() {
  const db = await SQLite.openDatabaseAsync('gameshelf.db');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS avaliacoes (
      game_id TEXT PRIMARY KEY NOT NULL,
      nota INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'quero_jogar',
      comentario TEXT NOT NULL DEFAULT '',
      atualizado_em TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS capturas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id TEXT NOT NULL,
      uri TEXT NOT NULL,
      legenda TEXT NOT NULL DEFAULT '',
      criado_em TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_capturas_game ON capturas (game_id);
  `);

  return db;
}

// ---------- Avaliações ----------

export const REVIEW_STATUS = [
  { value: 'quero_jogar', label: 'Quero jogar' },
  { value: 'jogando', label: 'Jogando' },
  { value: 'zerado', label: 'Zerado' },
];

export async function getReview(gameId) {
  const db = await getDatabase();
  return db.getFirstAsync('SELECT * FROM avaliacoes WHERE game_id = ?', gameId);
}

export async function getAllReviews() {
  const db = await getDatabase();
  return db.getAllAsync('SELECT * FROM avaliacoes');
}

// Insere a avaliação ou atualiza se o jogo já tiver uma (UPSERT).
export async function saveReview({ gameId, nota, status, comentario }) {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO avaliacoes (game_id, nota, status, comentario, atualizado_em)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(game_id) DO UPDATE SET
       nota = excluded.nota,
       status = excluded.status,
       comentario = excluded.comentario,
       atualizado_em = excluded.atualizado_em`,
    gameId,
    nota,
    status,
    comentario,
    new Date().toISOString()
  );
}

export async function deleteReview(gameId) {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM avaliacoes WHERE game_id = ?', gameId);
}

// ---------- Capturas ----------

export async function getCaptures(gameId) {
  const db = await getDatabase();
  return db.getAllAsync(
    'SELECT * FROM capturas WHERE game_id = ? ORDER BY criado_em DESC',
    gameId
  );
}

export async function getCaptureById(id) {
  const db = await getDatabase();
  return db.getFirstAsync('SELECT * FROM capturas WHERE id = ?', id);
}

export async function getAllCaptures() {
  const db = await getDatabase();
  return db.getAllAsync('SELECT * FROM capturas ORDER BY criado_em DESC');
}

export async function addCapture({ gameId, uri, legenda }) {
  const db = await getDatabase();
  const result = await db.runAsync(
    'INSERT INTO capturas (game_id, uri, legenda, criado_em) VALUES (?, ?, ?, ?)',
    gameId,
    uri,
    legenda,
    new Date().toISOString()
  );
  return result.lastInsertRowId;
}

export async function updateCaptureCaption(id, legenda) {
  const db = await getDatabase();
  await db.runAsync('UPDATE capturas SET legenda = ? WHERE id = ?', legenda, id);
}

export async function deleteCapture(id) {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM capturas WHERE id = ?', id);
}
