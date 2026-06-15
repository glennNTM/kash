/**
 * @swagger
 * tags:
 *   name: Sections
 *   description: Sections budgétaires d'un mois (répartition 50/30/20). La somme des pourcentages d'un mois ne peut pas dépasser 100%, et aucune section ne peut être sous 10%.
 */

/**
 * @swagger
 * /api/sections/month/{monthId}:
 *   get:
 *     summary: Récupérer les sections d'un mois
 *     tags: [Sections]
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
 *         description: Liste des sections du mois
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
 * /api/sections:
 *   post:
 *     summary: Créer une section
 *     tags: [Sections]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [monthId, name, type, percentage]
 *             properties:
 *               monthId:
 *                 type: integer
 *               name:
 *                 type: string
 *                 example: Charges
 *               type:
 *                 type: string
 *                 enum: [charges, epargne, loisirs, custom]
 *               percentage:
 *                 type: number
 *                 minimum: 0.1
 *                 maximum: 1
 *                 description: Fraction (0.5 = 50%). Minimum 10%, la somme du mois ne doit pas dépasser 100%.
 *                 example: 0.5
 *               sortOrder:
 *                 type: integer
 *                 minimum: 0
 *     responses:
 *       201:
 *         description: Section créée
 *       400:
 *         description: Données invalides, section sous 10%, ou somme des pourcentages > 100%
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Mois non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/sections/{id}:
 *   get:
 *     summary: Récupérer une section par son ID
 *     tags: [Sections]
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
 *         description: Détail de la section
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Section non trouvée
 *       500:
 *         description: Erreur serveur
 *   put:
 *     summary: Mettre à jour une section
 *     tags: [Sections]
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
 *               type:
 *                 type: string
 *                 enum: [charges, epargne, loisirs, custom]
 *               percentage:
 *                 type: number
 *                 minimum: 0.1
 *                 maximum: 1
 *               sortOrder:
 *                 type: integer
 *                 minimum: 0
 *     responses:
 *       200:
 *         description: Section mise à jour
 *       400:
 *         description: Données invalides ou somme des pourcentages > 100%
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Section non trouvée
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer une section (cascade sur ses dépenses)
 *     tags: [Sections]
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
 *         description: Section supprimée
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Section non trouvée
 *       500:
 *         description: Erreur serveur
 */
