# Docker Setup — Kash Backend

Guide pour lancer le backend Kash avec Docker en dev et en prod.

## Architecture

### Développement

- **Postgres local** : conteneur `postgres:16-alpine` avec volume persistant
- **Application** : build `development` avec hot-reload (`tsx watch`), source montée en volume
- **Avantage** : pas besoin de Postgres installé sur la machine, données isolées

### Production

- **Supabase** : connexion directe au Postgres Supabase via `DATABASE_URL` (pooler 6543)
- **Application** : build TypeScript compilé (`node dist/index.js`), limites CPU/RAM
- **Avantage** : image légère, sécurisée (user non-root)

## Prérequis

1. **Docker & Docker Compose** installés
2. Pour la prod : un projet **Supabase** avec les credentials dans `.env`

## Dev — Démarrage rapide

```bash
# Démarre Postgres + l'app avec hot-reload
pnpm docker:dev
```

Ça lance :
1. Un conteneur Postgres sur le port 5432 (`kash` / `kash_dev_password` / `kash_dev`)
2. L'app sur le port 8000 avec hot-reload
3. Le code source est monté en volume — les modifs sont prises en compte en temps réel

### Commandes dev

```bash
# Voir les logs en continu
pnpm docker:logs:dev

# Stopper et supprimer les conteneurs + volumes
pnpm docker:dev:down

# Lancer les migrations dans le conteneur
docker exec kash-app-dev pnpm db:push

# Ouvrir Drizzle Studio
docker exec kash-app-dev pnpm db:studio
```

### Connexion à la base dev depuis l'hôte

```
Host: localhost
Port: 5432
User: kash
Password: kash_dev_password
Database: kash_dev
```

## Prod — Déploiement

Assure-toi que le fichier `.env` contient toutes les variables requises (cf. `.env.example`).

```bash
# Build + démarrage en mode détaché
pnpm docker:prod

# Voir les logs
pnpm docker:logs:prod

# Stopper
pnpm docker:prod:down
```

### Lancer les migrations en prod

```bash
docker exec kash-app-prod pnpm db:migrate
```

## Variables d'environnement

| Variable | Dev (docker-compose) | Prod (.env) | Requis |
|---|---|---|---|
| `DATABASE_URL` | Auto (Postgres local) | Supabase pooler 6543 | Oui |
| `DIRECT_URL` | Auto | Supabase direct 5432 | Migrations only |
| `BETTER_AUTH_SECRET` | Valeur par défaut | Généré (`openssl rand -base64 32`) | Oui |
| `BETTER_AUTH_URL` | `http://localhost:8000` | URL publique du backend | Oui |
| `FRONTEND_URL` | `http://localhost:5173` | URL publique du frontend | Oui |
| `ARCJET_KEY` | Optionnel | Clé Arcjet | Optionnel |
| `GOOGLE_CLIENT_ID` | Optionnel | ID OAuth Google | Optionnel |
| `GOOGLE_CLIENT_SECRET` | Optionnel | Secret OAuth Google | Optionnel |

## Structure des fichiers Docker

```
backend/
├── Dockerfile                 # Multi-stage : development / build / production
├── .dockerignore              # Exclut node_modules, dist, .env, etc.
├── docker-compose.dev.yml     # Dev : Postgres local + app hot-reload
├── docker-compose.prod.yml    # Prod : app seule, se connecte à Supabase
└── .env.example               # Template des variables d'environnement
```

## Troubleshooting

### "Cannot connect to database"

```bash
# Vérifier que Postgres est healthy
docker compose -f docker-compose.dev.yml ps

# Voir les logs Postgres
docker logs kash-db-dev
```

### "Port already in use"

```bash
# Stopper tous les conteneurs
pnpm docker:dev:down

# Vérifier ce qui utilise le port (Windows)
netstat -ano | findstr :8000
netstat -ano | findstr :5432
```

### Nettoyage complet

```bash
# Supprimer conteneurs + volumes
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.prod.yml down -v

# Supprimer les images
docker rmi kash-backend-app

# Nettoyage Docker global
docker system prune -a
```
