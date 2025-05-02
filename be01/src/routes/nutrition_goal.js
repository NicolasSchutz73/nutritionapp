const express = require('express');
const router = express.Router();
const NutritionGoal = require('../models/nutrition_goal');
const { Op } = require('sequelize');

/**
 * @swagger
 * tags:
 *   name: NutritionGoals
 *   description: Objectifs nutritionnels par jour
 */

/**
 * @swagger
 * /api/nutrition-goals:
 *   post:
 *     summary: Créer ou mettre à jour l'objectif nutritionnel d'une date OU définir l'objectif par défaut
 *     tags: [NutritionGoals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-02"
 *               calories_goal:
 *                 type: number
 *                 example: 2000
 *               protein_goal:
 *                 type: number
 *                 example: 120
 *               carbs_goal:
 *                 type: number
 *                 example: 250
 *               fat_goal:
 *                 type: number
 *                 example: 60
 *               is_default:
 *                 type: boolean
 *                 example: true
 *                 description: Si true, définit l'objectif par défaut (pour tous les jours non personnalisés)
 *     responses:
 *       200:
 *         description: Objectif nutritionnel créé/mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NutritionGoal'
 */
router.post('/', async (req, res) => {
  try {
    const { date, is_default } = req.body;
    if (is_default) {
      // Supprimer tout autre goal par défaut
      await NutritionGoal.update({ is_default: false }, { where: { is_default: true } });
      let goal = await NutritionGoal.findOne({ where: { is_default: true } });
      if (goal) {
        await goal.update({ ...req.body, date: null, is_default: true });
      } else {
        goal = await NutritionGoal.create({ ...req.body, date: null, is_default: true });
      }
      return res.json(goal);
    }
    // Sinon, gestion par date
    let goal = await NutritionGoal.findOne({ where: { date } });
    if (goal) {
      await goal.update({ ...req.body, is_default: false });
    } else {
      goal = await NutritionGoal.create({ ...req.body, is_default: false });
    }
    res.json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Correction : placer la route /default AVANT la route /:date pour éviter le conflit

/**
 * @swagger
 * /api/nutrition-goals/default:
 *   get:
 *     summary: Récupérer l'objectif nutritionnel par défaut
 *     tags: [NutritionGoals]
 *     responses:
 *       200:
 *         description: Objectif par défaut trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NutritionGoal'
 *       404:
 *         description: Aucun objectif par défaut
 */
router.get('/default', async (req, res) => {
  try {
    const goal = await NutritionGoal.findOne({ where: { is_default: true } });
    if (!goal) return res.status(404).json({ error: 'Not found' });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// La route /:date doit venir APRÈS la route /default

/**
 * @swagger
 * /api/nutrition-goals/{date}:
 *   get:
 *     summary: Récupérer l'objectif nutritionnel d'une date (ou l'objectif par défaut si non défini)
 *     tags: [NutritionGoals]
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Objectif nutritionnel trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NutritionGoal'
 *       404:
 *         description: Objectif non trouvé
 */
router.get('/:date', async (req, res) => {
  try {
    let goal = await NutritionGoal.findOne({ where: { date: req.params.date } });
    if (!goal) {
      // Si pas d'objectif pour la date, retourner le goal par défaut s'il existe
      goal = await NutritionGoal.findOne({ where: { is_default: true } });
      if (!goal) return res.status(404).json({ error: 'Not found' });
    }
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
