import express, { type Express, type Request, type Response } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { env } from './config/env.js'
import apiRouter from './routes/index.js'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth.js'
import { errorHandler } from './middlewares/error.middleware.js'
import securityMiddleware from './middlewares/security.js'
import { DOCS_PORT } from './config/swagger.js'

// Construit l'application Express sans la démarrer (pas de listen).
// index.ts l'écoute en prod/dev ; les tests Supertest l'importent directement.
const app: Express = express()

app.use(helmet())

app.use(
  cors({
    // Frontend + serveur de doc Swagger (pour que "Try it out" atteigne l'API).
    origin: [env.FRONTEND_URL, `http://localhost:${DOCS_PORT}`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

// Le handler Better Auth doit être monté AVANT express.json() :
// il lit lui-même le corps brut des requêtes, qu'un parser global casserait.
// Rate limit strict sur l'auth : protège login/register du brute-force.
app.all('/api/auth/*splat', securityMiddleware(10), toNodeHandler(auth))

app.use(express.json())
app.use(cookieParser())

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Rate limit plus large sur l'API métier (le dashboard déclenche plusieurs requêtes au chargement).
app.use('/api', securityMiddleware(60), apiRouter)

// Gestionnaire d'erreurs central : monté en dernier pour capter ce que les routes propagent.
app.use(errorHandler)

export default app
