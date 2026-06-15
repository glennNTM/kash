import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { env } from './env.js'

// La doc est servie sur son propre port, distinct de l'API.
export const DOCS_PORT = 10000

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Kash',
      version: '1.0.0',
      description:
        "Documentation de l'API Kash. Toutes les routes /api/* exigent une session Better Auth " +
        '(cookie envoyé automatiquement par le navigateur). Réponses au format { data } ou { error }.',
    },
    servers: [
      {
        // Cible des requêtes "Try it out" : l'API tourne sur env.PORT, pas sur le port de la doc.
        url: `http://localhost:${env.PORT}`,
        description: 'Serveur de développement',
      },
    ],
    components: {
      securitySchemes: {
        // Better Auth gère l'auth par session cookie (pas de JWT bearer).
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'better-auth.session_token',
        },
      },
    },
    // Sécurité appliquée par défaut à toutes les routes (surchargée localement si besoin).
    security: [{ cookieAuth: [] }],
  },
  // swagger-jsdoc lit les commentaires @swagger directement sur le disque via ce glob.
  // On pointe les sources .ts (les commentaires sont strippés à la compilation).
  apis: ['./src/docs/*.ts'],
}

const swaggerSpec = swaggerJsdoc(options)

/**
 * Démarre un serveur Express dédié à la documentation Swagger, sur DOCS_PORT,
 * indépendant de l'API. Le "Try it out" vise l'API (cf. servers.url ci-dessus) ;
 * l'origine de la doc doit donc être autorisée par le CORS de l'API.
 */
export const setupSwagger = (): void => {
  const docsApp = express()

  const swaggerUiOptions: swaggerUi.SwaggerUiOptions = {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: true,
      // Envoie le cookie de session avec les requêtes "Try it out".
      requestInterceptor: (req: { credentials?: string }) => {
        req.credentials = 'include'
        return req
      },
    },
  }

  docsApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))
  docsApp.get('/', (_req, res) => res.redirect('/api-docs'))

  docsApp.listen(DOCS_PORT, () => {
    console.log(`Documentation Swagger disponible sur: http://localhost:${DOCS_PORT}/api-docs`)
  })
}
