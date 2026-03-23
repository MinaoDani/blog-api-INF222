// models/articleModel.js
const db = require('./db');

const ArticleModel = {

  // Créer un article
  create({ titre, contenu, auteur, date, categorie, tags }) {
    const tagsJson = JSON.stringify(Array.isArray(tags) ? tags : []);
    const dateVal = date || new Date().toISOString().slice(0, 10);
    const stmt = db.prepare(`
      INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(titre, contenu, auteur, dateVal, categorie || 'General', tagsJson);
    return ArticleModel.findById(result.lastInsertRowid);
  },

  // Trouver tous les articles (avec filtres optionnels)
  findAll({ categorie, auteur, date } = {}) {
    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];
    if (categorie) { query += ' AND categorie = ?'; params.push(categorie); }
    if (auteur)    { query += ' AND auteur = ?';    params.push(auteur); }
    if (date)      { query += ' AND date = ?';      params.push(date); }
    query += ' ORDER BY id DESC';
    const rows = db.prepare(query).all(...params);
    return rows.map(parseTags);
  },

  // Trouver un article par ID
  findById(id) {
    const row = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
    return row ? parseTags(row) : null;
  },

  // Mettre à jour un article
  update(id, { titre, contenu, categorie, tags }) {
    const existing = ArticleModel.findById(id);
    if (!existing) return null;
    const newTitre    = titre     ?? existing.titre;
    const newContenu  = contenu   ?? existing.contenu;
    const newCat      = categorie ?? existing.categorie;
    const newTags     = tags      !== undefined
      ? JSON.stringify(Array.isArray(tags) ? tags : [])
      : JSON.stringify(existing.tags);
    db.prepare(`
      UPDATE articles SET titre=?, contenu=?, categorie=?, tags=? WHERE id=?
    `).run(newTitre, newContenu, newCat, newTags, id);
    return ArticleModel.findById(id);
  },

  // Supprimer un article
  delete(id) {
    const existing = ArticleModel.findById(id);
    if (!existing) return false;
    db.prepare('DELETE FROM articles WHERE id = ?').run(id);
    return true;
  },

  // Recherche dans titre ou contenu
  search(query) {
    const like = `%${query}%`;
    const rows = db.prepare(`
      SELECT * FROM articles
      WHERE titre LIKE ? OR contenu LIKE ?
      ORDER BY id DESC
    `).all(like, like);
    return rows.map(parseTags);
  }
};

function parseTags(row) {
  try { row.tags = JSON.parse(row.tags); } catch { row.tags = []; }
  return row;
}

module.exports = ArticleModel;