const express = require('express');
const router = express.Router();
const QuickEntry = require('../models/quick_entry');

/**
 * @swagger
 * tags:
 *   name: QuickEntries
 *   description: Ajout/suppression/modification d'entrées rapides dans un repas virtuel (date/type)
 */

/**
 * @swagger
 * /api/quick-entries:
 *   post:
 *     summary: Ajouter une entrée rapide à un repas virtuel
 *     tags: [QuickEntries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [date, type]
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-02"
 *               type:
 *                 type: string
 *                 enum: [breakfast, lunch, dinner, snack, other]
 *                 example: dinner
 *               calories:
 *                 type: number
 *                 example: 200
 *               protein:
 *                 type: number
 *                 example: 10
 *               carbs:
 *                 type: number
 *                 example: 25
 *               fat:
 *                 type: number
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Yaourt rapide"
 *     responses:
 *       201:
 *         description: Entrée rapide ajoutée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuickEntry'
 */
router.post('/', async (req, res) => {
  try {
    const { date, type, calories, protein, carbs, fat, comment } = req.body;
    if (!date || !type) {
      return res.status(400).json({ error: 'date et type sont requis' });
    }
    const quickEntry = await QuickEntry.create({ date, type, calories, protein, carbs, fat, comment });
    res.status(201).json(quickEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/quick-entries/{id}:
 *   put:
 *     summary: Modifier une entrée rapide
 *     tags: [QuickEntries]
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
 *               calories:
 *                 type: number
 *                 example: 220
 *               protein:
 *                 type: number
 *               carbs:
 *                 type: number
 *               fat:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Entrée rapide modifiée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuickEntry'
 *       404:
 *         description: Entrée rapide non trouvée
 */
router.put('/:id', async (req, res) => {
  try {
    const quickEntry = await QuickEntry.findByPk(req.params.id);
    if (!quickEntry) return res.status(404).json({ error: 'Not found' });
    await quickEntry.update(req.body);
    res.json(quickEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/quick-entries/{id}:
 *   delete:
 *     summary: Supprimer une entrée rapide
 *     tags: [QuickEntries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Entrée rapide supprimée
 *       404:
 *         description: Entrée rapide non trouvée
 */
router.delete('/:id', async (req, res) => {
  try {
    const quickEntry = await QuickEntry.findByPk(req.params.id);
    if (!quickEntry) return res.status(404).json({ error: 'Not found' });
    await quickEntry.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
