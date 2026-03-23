// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: ' Blog API',
      version: '1.0.0',
      description: `API REST pour la gestion d'un blog simple.
      
**Fonctionnalités :**
- CRUD complet sur les articles
- Filtrage par catégorie, auteur et date
- Recherche plein texte dans titre et contenu

**Technologies :** Node.js · Express · SQLite · Swagger UI`,
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur local de développement',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);