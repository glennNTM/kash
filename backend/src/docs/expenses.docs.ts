/**
 * @swagger
 * tags:
 *   name: Dépenses
 *   description: Dépenses rattachées à une section. Le champ paidAt est géré automatiquement selon le statut (rempli si "paid", vidé si "planned").
 */

/**
 * @swagger
 * /api/expenses/section/{sectionId}:
 *   get:
 *     summary: Récupérer les dépenses d'une section
 *     tags: [Dépenses]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des dépenses de la section
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Section non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Créer une dépense
 *     tags: [Dépenses]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sectionId, name, amountPlanned]
 *             properties:
 *               sectionId:
 *                 type: integer
 *               name:
 *                 type: string
 *                 example: Courses
 *               category:
 *                 type: string
 *                 example: Alimentation
 *               amountPlanned:
 *                 type: number
 *                 exclusiveMinimum: 0
 *                 example: 150
 *               amountReal:
 *                 type: number
 *                 minimum: 0
 *               status:
 *                 type: string
 *                 enum: [planned, paid]
 *                 default: planned
 *               isRecurring:
 *                 type: boolean
 *                 description: Si vrai, la dépense est dupliquée au mois suivant
 *               sortOrder:
 *                 type: integer
 *                 minimum: 0
 *     responses:
 *       201:
 *         description: Dépense créée
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Section non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/expenses/{id}:
 *   get:
 *     summary: Récupérer une dépense par son ID
 *     tags: [Dépenses]
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
 *         description: Détail de la dépense
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Dépense non trouvée
 *       500:
 *         description: Erreur serveur
 *   put:
 *     summary: Mettre à jour une dépense
 *     tags: [Dépenses]
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
 *               category:
 *                 type: string
 *               amountPlanned:
 *                 type: number
 *                 exclusiveMinimum: 0
 *               amountReal:
 *                 type: number
 *                 minimum: 0
 *               status:
 *                 type: string
 *                 enum: [planned, paid]
 *               isRecurring:
 *                 type: boolean
 *               sortOrder:
 *                 type: integer
 *                 minimum: 0
 *     responses:
 *       200:
 *         description: Dépense mise à jour
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Dépense non trouvée
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer une dépense
 *     tags: [Dépenses]
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
 *         description: Dépense supprimée
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Dépense non trouvée
 *       500:
 *         description: Erreur serveur
 */
