// Exécuté avant chaque fichier de test (cf. vitest.config.ts → setupFiles).
// Pose des variables d'environnement factices AVANT tout import de l'app :
//  - env.ts throw si DATABASE_URL/secrets manquent ;
//  - NODE_ENV=test fait court-circuiter Arcjet (security.ts) → pas de réseau.
// La base n'est jamais réellement contactée : les services sont mockés (db mické).
process.env['NODE_ENV'] = 'test'
process.env['DATABASE_URL'] ??=
  'postgres://test:test@localhost:5432/test?sslmode=disable'
process.env['BETTER_AUTH_SECRET'] ??= 'test-secret'
process.env['BETTER_AUTH_URL'] ??= 'http://localhost:8000'
process.env['FRONTEND_URL'] ??= 'http://localhost:5173'
