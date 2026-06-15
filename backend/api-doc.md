# API Kash — Référence frontend

Référence rapide pour consommer l'API depuis le frontend React. La doc interactive
(Swagger UI) est disponible en dev sur **http://localhost:8000/api-docs**.

---

## Conventions générales

- **Base URL** (dev) : `http://localhost:8000`
- **Authentification** : session **Better Auth par cookie**. Aucun token à gérer manuellement —
  il faut juste envoyer le cookie : `fetch(url, { credentials: 'include' })` (ou `withCredentials: true` avec axios).
- **Format des réponses** :
  - Succès : `{ "data": <T> }` (sauf `DELETE` → `204 No Content`, corps vide)
  - Erreur : `{ "error": "<message>" }`
- **IDs** : entiers (`integer`).
- **Montants** : renvoyés en **chaîne** (`"150.00"`) car colonnes `numeric`. À parser côté front
  (et formater via `formatAmount()`).
- **Pourcentages** : fraction (`0.5` = 50%).
- **Dates** : ISO 8601 (`deadline`, `paidAt`).

### Codes de statut

| Code | Sens |
|------|------|
| 200 | OK |
| 201 | Créé |
| 204 | Supprimé (pas de corps) |
| 400 | Données invalides (Zod) ou règle métier violée |
| 401 | Non authentifié (pas de session) |
| 403 | Bloqué par Arcjet (bot / rate limit) |
| 404 | Ressource introuvable (ou n'appartenant pas à l'utilisateur) |
| 409 | Conflit (contrainte d'unicité) |
| 500 | Erreur serveur |

### Exemple d'appel

```ts
// GET
const res = await fetch('http://localhost:8000/api/months', { credentials: 'include' })
const { data } = await res.json()

// POST
const res = await fetch('http://localhost:8000/api/sections', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ monthId: 1, name: 'Charges', type: 'charges', percentage: 0.5 }),
})
```

---

## Mois — `/api/months`

| Méthode | Chemin | Description |
|---------|--------|-------------|
| GET | `/api/months` | Tous les mois de l'utilisateur (récents d'abord) |
| GET | `/api/months/:id` | Un mois |
| POST | `/api/months` | Créer un mois |
| PUT | `/api/months/:id` | Mettre à jour |
| DELETE | `/api/months/:id` | Supprimer (cascade) |

**Corps (POST)** — `name`, `month`, `year` requis :
```json
{ "name": "Juin 2026", "month": 6, "year": 2026, "totalIncome": 2500 }
```
- `month` : 1–12 · `totalIncome` : optionnel (≥ 0, défaut 0)
- PUT : tous les champs optionnels
- 409 si un mois (mois + année) existe déjà

---

## Sections — `/api/sections`

| Méthode | Chemin | Description |
|---------|--------|-------------|
| GET | `/api/sections/month/:monthId` | Sections d'un mois |
| GET | `/api/sections/:id` | Une section |
| POST | `/api/sections` | Créer |
| PUT | `/api/sections/:id` | Mettre à jour |
| DELETE | `/api/sections/:id` | Supprimer (cascade sur dépenses) |

**Corps (POST)** — `monthId`, `name`, `type`, `percentage` requis :
```json
{ "monthId": 1, "name": "Charges", "type": "charges", "percentage": 0.5, "sortOrder": 0 }
```
- `type` : `charges` | `epargne` | `loisirs` | `custom`
- `percentage` : 0.10–1.00. **Min 10%**, et la **somme du mois ne peut pas dépasser 100%** (→ 400)
- PUT : tous optionnels sauf `monthId` (non modifiable)

---

## Revenus — `/api/incomes`

| Méthode | Chemin | Description |
|---------|--------|-------------|
| GET | `/api/incomes/month/:monthId` | Revenus d'un mois |
| GET | `/api/incomes/:id` | Un revenu |
| POST | `/api/incomes` | Créer |
| PUT | `/api/incomes/:id` | Mettre à jour |
| DELETE | `/api/incomes/:id` | Supprimer |

**Corps (POST)** — `monthId`, `name`, `amount` requis :
```json
{ "monthId": 1, "name": "Salaire", "amount": 2000, "isFavorite": true }
```
- `amount` : > 0 · `isFavorite` : optionnel (dupliqué au mois suivant si vrai)
- PUT : tous optionnels sauf `monthId`

---

## Dépenses — `/api/expenses`

| Méthode | Chemin | Description |
|---------|--------|-------------|
| GET | `/api/expenses/section/:sectionId` | Dépenses d'une section |
| GET | `/api/expenses/:id` | Une dépense |
| POST | `/api/expenses` | Créer |
| PUT | `/api/expenses/:id` | Mettre à jour |
| DELETE | `/api/expenses/:id` | Supprimer |

**Corps (POST)** — `sectionId`, `name`, `amountPlanned` requis :
```json
{ "sectionId": 1, "name": "Courses", "category": "Alimentation",
  "amountPlanned": 150, "amountReal": 142, "status": "paid", "isRecurring": false }
```
- `amountPlanned` : > 0 · `amountReal` : ≥ 0, optionnel
- `status` : `planned` (défaut) | `paid`
- **`paidAt` est géré automatiquement** : rempli quand `status = paid`, vidé quand `planned`. Ne pas l'envoyer.
- `isRecurring` : optionnel (dupliqué au mois suivant si vrai)
- PUT : tous optionnels sauf `sectionId`

---

## Objectifs — `/api/goals`

| Méthode | Chemin | Description |
|---------|--------|-------------|
| GET | `/api/goals` | Objectifs de l'utilisateur |
| GET | `/api/goals/:id` | Un objectif |
| POST | `/api/goals` | Créer |
| PUT | `/api/goals/:id` | Mettre à jour |
| DELETE | `/api/goals/:id` | Supprimer (cascade sur contributions) |

**Corps (POST)** — `name`, `targetAmount` requis :
```json
{ "name": "Vacances", "targetAmount": 1500, "deadline": "2026-12-31T00:00:00Z" }
```
- `targetAmount` : > 0 · `deadline` : ISO, optionnel · `isCompleted` : optionnel
- PUT : tous optionnels

---

## Contributions — `/api/goal-contributions`

| Méthode | Chemin | Description |
|---------|--------|-------------|
| GET | `/api/goal-contributions/goal/:goalId` | Contributions d'un objectif |
| GET | `/api/goal-contributions/:id` | Une contribution |
| POST | `/api/goal-contributions` | Créer |
| PUT | `/api/goal-contributions/:id` | Mettre à jour (nom / montant) |
| DELETE | `/api/goal-contributions/:id` | Supprimer |

**Corps (POST)** — `goalId`, `monthId`, `name`, `amount` requis :
```json
{ "goalId": 1, "monthId": 1, "name": "Versement de juin", "amount": 200 }
```
- `amount` : > 0
- **Une seule contribution par couple (`goalId`, `monthId`)** → 409 sinon
- PUT : seuls `name` et `amount` modifiables (rattachement immuable)
