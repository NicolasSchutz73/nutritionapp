// Ce fichier importe et initialise toutes les associations. À utiliser au démarrage de l'app.
const sequelize = require('./index');
const Food = require('./food');
const Meal = require('./meal');
const MealFood = require('./meal_food');
const QuickEntry = require('./quick_entry');
const NutritionGoal = require('./nutrition_goal');

// Synchronisation des modèles avec la base de données (création des tables si besoin)
async function syncModels(force = false) {
  await sequelize.sync({ force });
  console.log('Toutes les tables sont synchronisées.');
}

module.exports = {
  sequelize,
  Food,
  Meal,
  MealFood,
  QuickEntry,
  NutritionGoal,
  syncModels,
};
