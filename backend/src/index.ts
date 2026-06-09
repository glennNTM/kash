import express, { type Request, type Response } from 'express'
import helmet from 'helmet'
import xssClean from 'xss-clean'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { env } from './config/env.js'
import apiRouter from './routes/index.js'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth.js'

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
app.use(xssClean())
app.use(cookieParser())

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api', apiRouter)

app.listen(env.PORT, () => {
  console.log(`Serveur sur http://localhost:${env.PORT}`)
})
