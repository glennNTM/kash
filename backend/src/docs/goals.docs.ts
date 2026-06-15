/**
 * @swagger
 * tags:
 *   name: Objectifs
 *   description: Objectifs d'épargne de l'utilisateur
 */

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Récupérer les objectifs de l'utilisateur connecté
 *     tags: [Objectifs]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des objectifs
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 *   post:
 *     summary: Créer un objectif
 *     tags: [Objectifs]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, targetAmount]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Vacances
 *               targetAmount:
 *                 type: number
 *                 exclusiveMinimum: 0
 *                 example: 1500
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               isCompleted:
 *                 type: boolean
 *               sortOrder:
 *                 type: integer
 *                 minimum: 0
 *     responses:
 *       201:
 *         description: Objectif créé
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/goals/{id}:
 *   get:
 *     summary: Récupérer un objectif par son ID
 *     tags: [Objectifs]
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
 *         description: Détail de l'objectif
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Objectif non trouvé
 *       500:
 *         description: Erreur serveur
 *   put:
 *     summary: Mettre à jour un objectif
 *     tags: [Objectifs]
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
 *               targetAmount:
 *                 type: number
 *                 exclusiveMinimum: 0
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               isCompleted:
 *                 type: boolean
 *               sortOrder:
 *                 type: integer
 *                 minimum: 0
 *     responses:
 *       200:
 *         description: Objectif mis à jour
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Objectif non trouvé
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer un objectif (cascade sur ses contributions)
 *     tags: [Objectifs]
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
 *         description: Objectif supprimé
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Objectif non trouvé
 *       500:
 *         description: Erreur serveur
 */
