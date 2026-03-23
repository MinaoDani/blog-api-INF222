// controllers/articleController.js
const ArticleModel = require('../models/articleModel');

// POST /api/articles
exports.createArticle = (req, res) => {
  const { titre, contenu, auteur, date, categorie, tags } = req.body;

  if (!titre || titre.trim() === '') {
    return res.status(400).json({ error: 'Le titre est obligatoire.' });
  }
  if (!contenu || contenu.trim() === '') {
    return res.status(400).json({ error: 'Le contenu est obligatoire.' });
  }
  if (!auteur || auteur.trim() === '') {
    return res.status(400).json({ error: "L'auteur est obligatoire." });
  }

  try {
    const article = ArticleModel.create({ titre, contenu, auteur, date, categorie, tags });
    return res.status(201).json({
      message: 'Article créé avec succès.',
      article
    });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
  }
};

// GET /api/articles
exports.getArticles = (req, res) => {
  const { categorie, auteur, date } = req.query;
  try {
    const articles = ArticleModel.findAll({ categorie, auteur, date });
    return res.status(200).json(articles);
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
  }
};

// GET /api/articles/search
exports.searchArticles = (req, res) => {
  const { query } = req.query;
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Le paramètre "query" est requis.' });
  }
  try {
    const articles = ArticleModel.search(query.trim());
    return res.status(200).json(articles);
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
  }
};

// GET /api/articles/:id
exports.getArticleById = (req, res) => {
  const { id } = req.params;
  try {
    const article = ArticleModel.findById(Number(id));
    if (!article) {
      return res.status(404).json({ error: `Article avec id=${id} introuvable.` });
    }
    return res.status(200).json(article);
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
  }
};

// PUT /api/articles/:id
exports.updateArticle = (req, res) => {
  const { id } = req.params;
  const { titre, contenu, categorie, tags } = req.body;

  if (titre !== undefined && titre.trim() === '') {
    return res.status(400).json({ error: 'Le titre ne peut pas être vide.' });
  }

  try {
    const updated = ArticleModel.update(Number(id), { titre, contenu, categorie, tags });
    if (!updated) {
      return res.status(404).json({ error: `Article avec id=${id} introuvable.` });
    }
    return res.status(200).json({
      message: 'Article mis à jour avec succès.',
      article: updated
    });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
  }
};

// DELETE /api/articles/:id
exports.deleteArticle = (req, res) => {
  const { id } = req.params;
  try {
    const deleted = ArticleModel.delete(Number(id));
    if (!deleted) {
      return res.status(404).json({ error: `Article avec id=${id} introuvable.` });
    }
    return res.status(200).json({ message: `Article id=${id} supprimé avec succès.` });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
  }
};