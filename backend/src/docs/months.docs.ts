/**
 * @swagger
 * tags:
 *   name: Mois
 *   description: Gestion des mois budgétaires de l'utilisateur
 */

/**
 * @swagger
 * /api/months:
 *   get:
 *     summary: Récupérer tous les mois de l'utilisateur connecté
 *     tags: [Mois]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: details
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Si true, inclut les sections et dépenses imbriquées (vues globales / tendances)
 *     responses:
 *       200:
 *         description: Liste des mois (triés du plus récent au plus ancien)
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 *   post:
 *     summary: Créer un mois
 *     tags: [Mois]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, month, year]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juin 2026
 *               month:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 12
 *                 example: 6
 *               year:
 *                 type: integer
 *                 example: 2026
 *               totalIncome:
 *                 type: number
 *                 minimum: 0
 *                 example: 2500
 *     responses:
 *       201:
 *         description: Mois créé
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       409:
 *         description: Un mois identique (mois/année) existe déjà
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/months/{id}:
 *   get:
 *     summary: Récupérer un mois par son ID
 *     tags: [Mois]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détail du mois
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Mois non trouvé
 *       500:
 *         description: Erreur serveur
 *   put:
 *     summary: Mettre à jour un mois
 *     tags: [Mois]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               month:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 12
 *               year:
 *                 type: integer
 *               totalIncome:
 *                 type: number
 *                 minimum: 0
 *     responses:
 *       200:
 *         description: Mois mis à jour
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Mois non trouvé
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer un mois (cascade sur sections, revenus, contributions)
 *     tags: [Mois]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Mois supprimé
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Mois non trouvé
 *       500:
 *         description: Erreur serveur
 */
