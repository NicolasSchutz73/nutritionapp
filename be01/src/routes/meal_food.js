const express = require('express');
const router = express.Router();
const MealFood = require('../models/meal_food');
const Food = require('../models/food');

/**
 * @swagger
 * tags:
 *   name: MealFoods
 *   description: Ajout/suppression/modification d'aliments dans un repas virtuel (date/type)
 */

/**
 * @swagger
 * /api/meal-foods:
 *   post:
 *     summary: Ajouter un aliment à un repas virtuel
 *     tags: [MealFoods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [date, type, food_id, quantity_g]
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-02"
 *               type:
 *                 type: string
 *                 enum: [breakfast, lunch, dinner, snack, other]
 *                 example: lunch
 *               food_id:
 *                 type: integer
 *                 example: 1
 *               quantity_g:
 *                 type: number
 *                 example: 120
 *     responses:
 *       201:
 *         description: Aliment ajouté
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MealFood'
 */
router.post('/', async (req, res) => {
  try {
    const { date, type, food_id, quantity_g } = req.body;
    if (!date || !type || !food_id || !quantity_g) {
      return res.status(400).json({ error: 'date, type, food_id et quantity_g sont requis' });
    }
    const mealFood = await MealFood.create({ date, type, food_id, quantity_g });
    res.status(201).json(mealFood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/meal-foods/{id}:
 *   put:
 *     summary: Modifier la quantité d'un aliment dans un repas virtuel
 *     tags: [MealFoods]
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
 *               quantity_g:
 *                 type: number
 *                 example: 150
 *     responses:
 *       200:
 *         description: Aliment modifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MealFood'
 *       404:
 *         description: Aliment non trouvé
 */
router.put('/:id', async (req, res) => {
  try {
    const mealFood = await MealFood.findByPk(req.params.id);
    if (!mealFood) return res.status(404).json({ error: 'Not found' });
    await mealFood.update(req.body);
    res.json(mealFood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/meal-foods/{id}:
 *   delete:
 *     summary: Supprimer un aliment d'un repas virtuel
 *     tags: [MealFoods]
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
    const mealFood = await MealFood.findByPk(req.params.id);
    if (!mealFood) return res.status(404).json({ error: 'Not found' });
    await mealFood.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
