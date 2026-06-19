/**
 * @swagger
 * tags:
 *   name: Revenus
 *   description: Revenus rattachés à un mois
 */

/**
 * @swagger
 * /api/incomes/month/{monthId}:
 *   get:
 *     summary: Récupérer les revenus d'un mois
 *     tags: [Revenus]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: monthId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des revenus du mois
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Mois non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/incomes:
 *   post:
 *     summary: Créer un revenu
 *     tags: [Revenus]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [monthId, name, amount]
 *             properties:
 *               monthId:
 *                 type: integer
 *               name:
 *                 type: string
 *                 example: Salaire
 *               amount:
 *                 type: number
 *                 exclusiveMinimum: 0
 *                 example: 2000
 *               isFavorite:
 *                 type: boolean
 *                 description: Si vrai, le revenu est dupliqué au mois suivant
 *     responses:
 *       201:
 *         description: Revenu créé
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Mois non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/incomes/{id}:
 *   get:
 *     summary: Récupérer un revenu par son ID
 *     tags: [Revenus]
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
 *         description: Détail du revenu
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Revenu non trouvé
 *       500:
 *         description: Erreur serveur
 *   put:
 *     summary: Mettre à jour un revenu
 *     tags: [Revenus]
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
 *               isFavorite:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Revenu mis à jour
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Revenu non trouvé
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer un revenu
 *     tags: [Revenus]
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
 *         description: Revenu supprimé
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Revenu non trouvé
 *       500:
 *         description: Erreur serveur
 */
