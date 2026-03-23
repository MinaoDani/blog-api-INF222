#  Blog API

API REST complète pour la gestion d'un blog, développée avec **Node.js / Express**, **SQLite** et documentée via **Swagger UI**.

---

##  Installation & démarrage

```bash
# 1. Cloner le dépôt
git clone https://github.com/MinaoDani/blog-api-INF222.git
cd blog-api

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur
npm start          # production
npm run dev        # développement (rechargement auto)
```

Le serveur démarre sur **http://localhost:3000**

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Interface web |
| `http://localhost:3000/api-docs` | Documentation Swagger UI |

---

##  Structure du projet

```
blog-api/
├── index.js                  # Point d'entrée – serveur Express
├── package.json
├── blog.db                   # Base de données SQLite (générée automatiquement)
├── config/
│   └── swagger.js            # Configuration Swagger / OpenAPI 3.0
├── models/
│   ├── db.js                 # Connexion SQLite + création de la table
│   └── articleModel.js       # Requêtes SQL (CRUD + search)
├── controllers/
│   └── articleController.js  # Logique métier + validation
├── routes/
│   └── articles.js           # Définition des routes + annotations Swagger
└── public/
    └── index.html            # Interface web
```

---

##  Endpoints de l'API

### Créer un article
```
POST /api/articles
```
**Body JSON :**
```json
{
  "titre": "Introduction aux API REST",
  "contenu": "Une API REST est une interface...",
  "auteur": "Jean Dupont",
  "date": "2026-03-23",
  "categorie": "Tech",
  "tags": ["api", "rest", "web"]
}
```
**Réponse 201 :**
```json
{
  "message": "Article créé avec succès.",
  "article": { "id": 1, "titre": "...", ... }
}
```

---

### Lire tous les articles (avec filtres optionnels)
```
GET /api/articles
GET /api/articles?categorie=Tech
GET /api/articles?auteur=Jean Dupont
GET /api/articles?date=2026-03-23
GET /api/articles?categorie=Tech&date=2026-03-23
```
**Réponse 200 :** tableau JSON d'articles

---

### Lire un article par ID
```
GET /api/articles/:id
```
**Réponse 200 :** objet article complet  
**Réponse 404 :** article introuvable

---

### Modifier un article
```
PUT /api/articles/:id
```
**Body JSON (tous les champs sont optionnels) :**
```json
{
  "titre": "Nouveau titre",
  "contenu": "Contenu mis à jour...",
  "categorie": "Science",
  "tags": ["update"]
}
```
**Réponse 200 :** article mis à jour

---

### Supprimer un article
```
DELETE /api/articles/:id
```
**Réponse 200 :**
```json
{ "message": "Article id=1 supprimé avec succès." }
```

---

### Rechercher des articles
```
GET /api/articles/search?query=texte
```
**Réponse 200 :** tableau JSON des articles dont le titre ou contenu contient le texte

---

##  Codes HTTP utilisés

| Code | Signification |
|------|--------------|
| 200  | OK – requête réussie |
| 201  | Created – ressource créée |
| 400  | Bad Request – données invalides ou manquantes |
| 404  | Not Found – article inexistant |
| 500  | Internal Server Error – erreur serveur |

---

##  Validations

- `titre` : obligatoire, non vide
- `auteur` : obligatoire, non vide
- `contenu` : obligatoire, non vide
- `tags` : tableau de chaînes (optionnel, défaut `[]`)
- `date` : format `YYYY-MM-DD` (défaut : date du jour)
- `categorie` : défaut `"General"`

---

##  Technologies

- **Node.js** + **Express 4**
- **better-sqlite3** (SQLite synchrone, zéro configuration)
- **swagger-jsdoc** + **swagger-ui-express** (documentation OpenAPI 3.0)
- **cors** (Cross-Origin Resource Sharing)
