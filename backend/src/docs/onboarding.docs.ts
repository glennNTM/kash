/**
 * @swagger
 * tags:
 *   name: Onboarding
 *   description: Création atomique du budget initial (mois + revenu + sections + 1re dépense) en une transaction.
 */

/**
 * @swagger
 * /api/onboarding:
 *   post:
 *     summary: Initialiser le budget d'un nouvel utilisateur
 *     description: >
 *       Crée en une seule transaction le mois, le revenu, les sections (répartition)
 *       et la première dépense. La somme des pourcentages doit valoir 100% et aucune
 *       section ne peut être sous 10%. Si un budget existe déjà pour ce mois (contrainte
 *       unique), renvoie 409 sans rien créer.
 *     tags: [Onboarding]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [month, year, income, allocation, firstExpense]
 *             properties:
 *               month:
 *                 type: integer
 *                 example: 6
 *               year:
 *                 type: integer
 *                 example: 2026
 *               income:
 *                 type: object
 *                 required: [name, amount]
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Salaire
 *                   amount:
 *                     type: number
 *                     example: 300000
 *               allocation:
 *                 type: array
 *                 description: Sections du mois. Somme des pourcentages = 1.0, chaque part >= 0.1.
 *                 items:
 *                   type: object
 *                   required: [name, type, percentage]
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Charges fixes
 *                     type:
 *                       type: string
 *                       enum: [charges, epargne, loisirs, custom]
 *                     percentage:
 *                       type: number
 *                       example: 0.5
 *               firstExpense:
 *                 type: object
 *                 required: [sectionIndex, name, amountPlanned]
 *                 properties:
 *                   sectionIndex:
 *                     type: integer
 *                     description: Index de la section cible dans `allocation`.
 *                     example: 0
 *                   name:
 *                     type: string
 *                     example: Loyer
 *                   category:
 *                     type: string
 *                     example: Logement
 *                   amountPlanned:
 *                     type: number
 *                     example: 120000
 *                   status:
 *                     type: string
 *                     enum: [planned, paid]
 *     responses:
 *       201:
 *         description: Budget initial créé (mois enrichi de ses sections et dépenses)
 *       400:
 *         description: Données invalides (somme != 100%, part < 10%, section cible invalide)
 *       401:
 *         description: Non authentifié
 *       409:
 *         description: Un budget existe déjà pour ce mois
 *       500:
 *         description: Erreur serveur
 */
