const express = require('express');
const { syncModels } = require('./models/initModels');

const app = express();
app.use(express.json());

// Synchronisation des modèles Sequelize avec la base de données
syncModels(true) // Passe à true pour forcer la recréation des tables
  .catch((err) => {
    console.error('Erreur lors de la synchronisation des modèles:', err);
    process.exit(1);
  });

// --- Import des routes REST ---
const foodRoutes = require('./routes/food');
const mealRoutes = require('./routes/meal'); // GET only
const mealFoodRoutes = require('./routes/meal_food');
const quickEntryRoutes = require('./routes/quick_entry');
const nutritionGoalRoutes = require('./routes/nutrition_goal');

// --- Montage des routes ---
app.use('/api/foods', foodRoutes);
app.use('/api/meals', mealRoutes); // GET only
app.use('/api/meal-foods', mealFoodRoutes);
app.use('/api/quick-entries', quickEntryRoutes);
app.use('/api/nutrition-goals', nutritionGoalRoutes);

// --- Endpoint de test ---
app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', message: 'API NutritionApp opérationnelle!' });
});

// --- Swagger documentation ---
require('./swagger')(app);

app.get('/', (req, res) => {
  res.send('NutritionApp API Express + Sequelize fonctionne !');
});

const PORT = process.env.PORT || 3000;
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée', url: req.originalUrl });
});
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  setInterval(() => console.log('Toujours vivant...'), 5000);
});
