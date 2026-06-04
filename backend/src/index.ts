import express, { type Request, type Response } from 'express'
import helmet from 'helmet';
import xssClean from 'xss-clean';
import cookieParser from 'cookie-parser';


// Instance de l'application Express
const app = express()
const PORT = 8000

// Middlewares
app.use(express.json())

// Middleware de sécurité Helmet (protection XSS de base et autres en-têtes de sécurité)
app.use(helmet());

// Protection contre les attaques XSS (nettoie les entrées utilisateur)
app.use(xssClean());

// Middleware pour parser les cookies (requis pour express-session)
app.use(cookieParser());

// Routes
app.get('/', (_req: Request, res: Response) =>{
    res.json({ message: 'Hello from Kash API'})
})

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Serveur
app.listen(PORT, () =>{
    console.log(`Le serveur tourne sur http://localhost:${PORT}`)
})