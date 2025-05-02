const express = require('express');
const router = express.Router();
const Food = require('../models/food');

/**
 * @swagger
 * tags:
 *   name: Foods
 *   description: Gestion des aliments
 */

/**
 * @swagger
 * /api/foods:
 *   post:
 *     summary: Créer un aliment
 *     tags: [Foods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       201:
 *         description: Aliment créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 */
router.post('/', async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/foods:
 *   get:
 *     summary: Récupérer tous les aliments
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: Liste des aliments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 */
router.get('/', async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/foods/{id}:
 *   get:
 *     summary: Récupérer un aliment par id
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aliment trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: Aliment non trouvé
 */
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) return res.status(404).json({ error: 'Not found' });
    res.json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/foods/{id}:
 *   put:
 *     summary: Mettre à jour un aliment
 *     tags: [Foods]
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
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       200:
 *         description: Aliment mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: Aliment non trouvé
 */
router.put('/:id', async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) return res.status(404).json({ error: 'Not found' });
    await food.update(req.body);
    res.json(food);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/foods/{id}:
 *   delete:
 *     summary: Supprimer un aliment
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Aliment supprimé
 *       404:
 *         description: Aliment non trouvé
 */
router.delete('/:id', async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) return res.status(404).json({ error: 'Not found' });
    await food.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
