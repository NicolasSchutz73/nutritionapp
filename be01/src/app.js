const express = require('express');
const { syncModels } = require('./models/initModels');

const app = express();
app.use(express.json());

// Synchronisation des modèles Sequelize avec la base de données
syncModels(false) // Passe à true pour forcer la recréation des tables
  .catch((err) => {
    console.error('Erreur lors de la synchronisation des modèles:', err);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('NutritionApp API Express + Sequelize fonctionne !');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
