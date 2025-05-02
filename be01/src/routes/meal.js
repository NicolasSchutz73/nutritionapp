// Ce fichier ne sert plus à rien car on ne crée/supprime plus de repas !
// On va juste fournir un endpoint GET pour retourner la structure complète des repas d'une journée.

const express = require('express');
const router = express.Router();
const MealFood = require('../models/meal_food');
const QuickEntry = require('../models/quick_entry');
const Food = require('../models/food');

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack', 'other'];

/**
 * @swagger
 * tags:
 *   name: Meals
 *   description: Structure complète des repas virtuels d'une journée (tous types, même vides)
 */

/**
 * @swagger
 * /api/meals:
 *   get:
 *     summary: Obtenir la structure complète des repas d'une journée
 *     tags: [Meals]
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date au format YYYY-MM-DD
 *     responses:
 *       200:
 *         description: Structure des repas du jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   format: date
 *                 meals:
 *                   type: object
 *                   additionalProperties:
 *                     type: object
 *                     properties:
 *                       foods:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/MealFood'
 *                       quick_entries:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/QuickEntry'
 */
router.get('/', async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: 'date requise' });
  }
  // Pour chaque type, récupérer les aliments et quick_entries
  const result = {};
  for (const type of MEAL_TYPES) {
    // Aliments
    const mealFoods = await MealFood.findAll({
      where: { date, type },
      include: [{ model: Food }],
      order: [['id', 'ASC']],
    });
    // Entrées rapides
    const quickEntries = await QuickEntry.findAll({
      where: { date, type },
      order: [['id', 'ASC']],
    });
    result[type] = {
      foods: mealFoods.map(mf => ({
        id: mf.id,
        food: mf.Food,
        quantity_g: mf.quantity_g,
      })),
      quick_entries: quickEntries,
    };
  }
  res.json({ date, meals: result });
});

module.exports = router;
