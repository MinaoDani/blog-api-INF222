// index.js
const express        = require('express');
const cors           = require('cors');
const swaggerUi      = require('swagger-ui-express');
const swaggerSpec    = require('./config/swagger');
const articlesRouter = require('./routes/articles');
const path           = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Interface web (fichiers statiques) ──────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── Documentation Swagger ────────────────────────────────────
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'Blog API – Docs',
    customCss: '.swagger-ui .topbar { background-color: #1a1a2e; }',
    swaggerOptions: { docExpansion: 'list', filter: true },
  })
);

// ── Routes API ───────────────────────────────────────────────
app.use('/api/articles', articlesRouter);

// ── Route racine : redirige vers l'interface web ─────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── 404 ──────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} introuvable.` });
});

// ── Démarrage ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  Serveur démarré sur http://localhost:${PORT}`);
  console.log(`  Swagger UI    → http://localhost:${PORT}/api-docs`);
  console.log(`  Interface web → http://localhost:${PORT}\n`);
});

module.exports = app;