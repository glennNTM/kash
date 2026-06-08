import express, { type Request, type Response } from 'express'
import helmet from 'helmet'
import xssClean from 'xss-clean'
import cookieParser from 'cookie-parser'
import { env } from './config/env.js'
import apiRouter from './routes/index.js'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(xssClean())
app.use(cookieParser())

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api', apiRouter)

app.listen(env.PORT, () => {
  console.log(`Serveur sur http://localhost:${env.PORT}`)
})