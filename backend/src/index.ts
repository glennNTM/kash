import express, { type Request, type Response } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { env } from './config/env.js'
import apiRouter from './routes/index.js'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth.js'
import { errorHandler } from './middlewares/error.middleware.js'

const app = express()

app.use(helmet())

app.use(
  cors({
    origin: env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)

// Le handler Better Auth doit être monté AVANT express.json() :
// il lit lui-même le corps brut des requêtes, qu'un parser global casserait.
app.all('/api/auth/*splat', toNodeHandler(auth))

app.use(express.json())
app.use(cookieParser())

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api', apiRouter)

// Gestionnaire d'erreurs central : monté en dernier pour capter ce que les routes propagent.
app.use(errorHandler)

app.listen(env.PORT, () => {
  console.log(`Serveur sur http://localhost:${env.PORT}`)
})
