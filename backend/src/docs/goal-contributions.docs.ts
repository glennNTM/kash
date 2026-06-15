/**
 * @swagger
 * tags:
 *   name: Contributions
 *   description: Contributions d'un mois vers un objectif d'épargne. Une seule contribution par couple (objectif, mois).
 */

/**
 * @swagger
 * /api/goal-contributions/goal/{goalId}:
 *   get:
 *     summary: Récupérer les contributions d'un objectif
 *     tags: [Contributions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: goalId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des contributions de l'objectif
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Objectif non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/goal-contributions:
 *   post:
 *     summary: Créer une contribution
 *     tags: [Contributions]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [goalId, monthId, name, amount]
 *             properties:
 *               goalId:
 *                 type: integer
 *               monthId:
 *                 type: integer
 *               name:
 *                 type: string
 *                 example: Versement de juin
 *               amount:
 *                 type: number
 *                 exclusiveMinimum: 0
 *                 example: 200
 *     responses:
 *       201:
 *         description: Contribution créée
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Objectif ou mois non trouvé
 *       409:
 *         description: Une contribution existe déjà pour ce couple (objectif, mois)
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/goal-contributions/{id}:
 *   get:
 *     summary: Récupérer une contribution par son ID
 *     tags: [Contributions]
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
 *         description: Détail de la contribution
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Contribution non trouvée
 *       500:
 *         description: Erreur serveur
 *   put:
 *     summary: Mettre à jour une contribution (nom / montant)
 *     tags: [Contributions]
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
 *               amount:
 *                 type: number
 *                 exclusiveMinimum: 0
 *     responses:
 *       200:
 *         description: Contribution mise à jour
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Contribution non trouvée
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer une contribution
 *     tags: [Contributions]
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
 *         description: Contribution supprimée
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Contribution non trouvée
 *       500:
 *         description: Erreur serveur
 */
