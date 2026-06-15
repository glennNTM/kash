import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import type { Express } from 'express'
import { env } from './env.js'

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

export const setupSwagger = (app: Express): void => {
  const swaggerUiOptions: swaggerUi.SwaggerUiOptions = {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: true,
      // Envoie le cookie de session avec les requêtes "Try it out" (même origine).
      requestInterceptor: (req: { credentials?: string }) => {
        req.credentials = 'include'
        return req
      },
    },
  }

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

  console.log(`Documentation Swagger disponible sur: http://localhost:${env.PORT}/api-docs`)
}
