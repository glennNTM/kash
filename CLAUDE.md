# CLAUDE.md — Kash

> Contexte et contraintes du projet, à charge pour l'assistant de s'y référer.
> Je code moi-même. Ce fichier sert à t'aligner quand je demande de l'aide sur une feature,
> un refactor, un debug ou une tâche répétitive — pas à te faire tout écrire à ma place.
> Donne des réponses qui respectent ces contraintes, et signale-moi si je m'en écarte.

---

## Le projet en une phrase

Kash est une application web responsive de gestion financière personnelle qui aide les jeunes salariés (18–30 ans, premier salaire) à appliquer la méthode budgétaire 50/30/20.

## Pourquoi il existe

L'éducation financière ne s'apprend nulle part. Kash donne un environnement simple pour répartir ses revenus (50 % charges / 30 % épargne / 20 % loisirs, ajustable), suivre ses dépenses, et garder le contrôle. Les émotions visées : clarté, fierté, confiance.

## Comment il se monétise

Un ebook « méthode 50/30/20 » est vendu sur Chariow (plateforme externe). La landing en fait la promo via un lien sortant (`CHARIOW_EBOOK_URL` dans `frontend/src/lib/constants.ts`).

---

## Stack

```
Architecture : PERN (Postgres · Express · React · Node)

Frontend  : React 19 + TypeScript + Vite (package manager : bun)
Styling   : Tailwind CSS v4 + shadcn/ui
State     : React Query (serveur) + Zustand (UI)
Forms     : react-hook-form + zod (zodResolver)
Toasts    : react-hot-toast
Charts    : Chart.js + react-chartjs-2
Icons     : Lucide React

Backend   : Node + Express + TypeScript (package manager : pnpm)
Auth      : Better Auth (adaptateur Drizzle)
Sécurité  : Arcjet (rate limiting, protection bots, validation)
ORM       : Drizzle ORM (driver postgres-js, schéma TypeScript, drizzle-kit pour migrations, ESM)
Base      : Neon (Postgres serverless hébergé — utilisé uniquement comme base de données,
            c'est Better Auth qui gère l'auth)
Validation: Zod (partagée front/back autant que possible)
```

### Décisions de stack à respecter

- **Drizzle ORM + Neon** : Neon est un Postgres serverless hébergé, utilisé uniquement comme base de
  données. Le schéma vit en TypeScript dans `src/db/schema/` (`auth.ts` pour les tables Better
  Auth, `app.ts` pour le métier, `relations.ts` pour les relations, `index.ts` ré-exporte tout).
  Spécificités à respecter : driver `postgres-js` (paquet `postgres`) avec `{ prepare: false }` obligatoire
  (pooler Neon en mode transaction via PgBouncer, pas de prepared statements) ; client Drizzle instancié
  dans `src/db/index.ts` et exporté sous `db` ; config drizzle-kit dans `drizzle.config.ts` à la racine ;
  ESM requis (`"type": "module"`, imports relatifs avec extension `.js`) ; IDs en `text` (Better Auth pour
  l'auth, `cuid2` via `@paralleldrive/cuid2` pour le métier). Deux URLs : `DATABASE_URL` (endpoint pooled
  Neon, host avec `-pooler`, runtime) et `DIRECT_URL` (endpoint direct Neon, sans `-pooler`, utilisée par
  drizzle-kit pour push/pull/migrate) ; SSL requis (`?sslmode=require`).
  Scripts : `pnpm db:generate`, `db:migrate`, `db:push`, `db:pull`, `db:studio`.
- **Tailwind v4** : pas de `tailwind.config.ts`. Config et tokens dans `globals.css`
  (`@import "tailwindcss"` + `@theme`). Syntaxe tokens : `bg-(--bg-1)`, `text-(--accent)` (parenthèses).
- **Better Auth** gère sessions et OAuth. Arcjet se branche en amont des routes sensibles.
- **Forms** : toujours react-hook-form + zodResolver + primitives `Form*` de shadcn. Ne pas réinventer.

---

## Règle de gestion des paquets

Jamais npm sauf dernier recours (lenteur, failles supply-chain).
- Frontend → `bun`
- Backend → `pnpm`
- Si une commande échoue avec l'un, essayer l'autre ; npm seulement si les deux échouent.

---

## Architecture de sécurité (non négociable)

Le frontend ne parle JAMAIS directement à la base. Flux unique :

```
React (frontend) → API Express (backend) → Drizzle → Neon/Postgres
                         ↑
                   Better Auth (sessions) + Arcjet (protection)
```

- Les secrets (DATABASE_URL, clés Better Auth, clé Arcjet) vivent uniquement côté backend.
- Le frontend n'a aucune variable d'environnement donnant accès à la base.
- Arcjet protège au minimum les routes d'auth et les mutations (rate limit + bots).

---

## Règles shadcn/ui

shadcn = primitives à comportement complexe uniquement (Dialog, Sheet, Select, Switch, Dropdown, Tooltip, Popover, Form).
Le visuel propre à Kash reste custom (HeroCard, BudgetSectionCard, SectionTile, ProgressBar, Badge, MonthSelector, StatCard, FAB).
Ne jamais installer un composant shadcn pour du décoratif. Lire `design-system.md` avant tout travail UI.

---

## Design system (résumé — détail dans design-system.md)

- Police : Plus Jakarta Sans (400/600/700)
- Fond `#F7F7F5`, cartes `#FFFFFF`
- Accent unique : vert `#1A9E6E`
- Rouge `#DC2626` : dépassements/erreurs uniquement. Orange `#D97706` : alertes (>80% budget) uniquement.
- Boutons toujours en pill (radius 9999px)
- Spacing base-4. Pas d'emojis dans l'UI (sauf champ `emoji` saisi par l'utilisateur).

---

## Layout responsive

Vrai layout par breakpoint, pas un écran mobile centré sur desktop.
- Mobile (<768px) : single column + bottom nav
- Desktop (>1024px) : sidebar gauche fixe (240px) + contenu fluide, max-width 1280px ; bottom nav masquée

Sidebar : Dashboard · Statistiques · Reste · Historique · Objectifs · Profil

---

## Pages de l'app (pas d'onglets sur le dashboard)

```
/                Landing (publique)
/login           Login/Register (publique)
/onboarding      3 étapes : revenus → répartition % → 1re dépense
/dashboard       Hero (revenus/dépensé/restant) + 4 tuiles sections + dernières dépenses + FAB
/statistiques    Graphes Chart.js (donut par section, donut par catégorie, barres alloué vs dépensé)
/reste           Restes non assignés par section + actions (Reporter / Vers épargne)
/section/:id     Détail d'une section + CRUD dépenses
/historique      Tableau des mois passés
/objectifs       Suivi des objectifs d'épargne
/profil          Paramètres utilisateur
```

Statistiques et Reste sont des **pages séparées** dans la sidebar, jamais des onglets du dashboard.

---

## Modèle de données

```
users              (géré par Better Auth)
months             (id, user_id, month, year, total_income)
incomes            (id, month_id, label, amount, is_favorite)
sections           (id, month_id, name, type[charges|epargne|loisirs|custom], percentage)
expenses           (id, section_id, label, category, amount_planned, amount_real,
                    status[planned|paid], paid_at, is_recurring)
goals              (id, user_id, name, emoji, target_amount, deadline)
goal_contributions (id, goal_id, month_id, amount)
```

### Règles métier critiques

- Somme des `percentage` d'un mois = 100 % (1.0) — validé Zod + contrainte côté base.
- `reste_section = (total_income × percentage) − Σ(dépenses payées de la section)`
- `is_recurring` (dépenses) et `is_favorite` (revenus) → dupliqués au mois suivant.
- Aucune part de répartition sous 10 % (règle produit issue de la méthode).
- Alerte (toast) si dépensé/alloué > 0.8 (warning) ou > 1.0 (dépassement).

---

## Conventions de code

- **TypeScript strict** : pas de `any`, jamais. Types inférés depuis Zod quand possible.
- **Réponses API** : toujours `{ data: T } | { error: string }`.
- **Nommage** : composants PascalCase, hooks/stores `useXxx`, routes Express kebab-case, tables snake_case.
- **State** : React Query pour le serveur, Zustand pour l'UI pure (modals, drawer). Jamais l'inverse.
- **Couleurs** : via tokens `(--token)`, jamais de hex en dur dans les composants.
- **Montants** : toujours via le helper `formatAmount()`, jamais formatés inline.
- **Toasts** : toujours react-hot-toast, jamais de composant maison.
- **CRUD** : toute création/édition/suppression passe par une modal (Dialog shadcn), pas une nouvelle page.
  Exceptions : onboarding et détail de section.
- **Tables** : toute liste de +2 colonnes est une vraie table, pas des cards empilées.

---

## Comment je veux que tu m'aides

- Je code moi-même. Tu es un assistant, pas un exécutant : propose, explique, challenge mes choix si besoin.
- Pour une **feature** : respecte la stack et les conventions ci-dessus, montre l'approche avant le code volumineux.
- Pour un **refactor** : préserve le comportement, signale les effets de bord.
- Pour un **debug** : raisonne sur la cause, ne corrige pas au hasard.
- Si je m'écarte d'une contrainte de ce fichier (sécurité, archi, conventions), **dis-le-moi**.
- En cas de doute sur un outil, réfère-toi aux docs officielles (shadcn, Better Auth, Arcjet, Drizzle ORM, React Query, Zod, react-hot-toast, Chart.js, Tailwind v4).
- Va à l'essentiel. Pas de sur-explication quand je connais déjà le sujet.

---

## Fichiers de référence

| Fichier | Contenu |
|---|---|
| `design-system.md` | Tokens, couleurs, typo, composants — lire avant tout travail UI |
| `CLAUDE.md` | Ce fichier — contexte et contraintes du projet |

---

*Kash · CLAUDE.md v3.4 · PERN · Drizzle ORM + Neon · Juin 2026*