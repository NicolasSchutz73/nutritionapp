const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NutritionApp API',
      version: '1.0.0',
      description: 'API REST pour le suivi alimentaire et nutritionnel',
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
    components: {
      schemas: {
        Food: {
          type: 'object',
          required: ['name'],
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Pâtes complètes' },
            calories: { type: 'number', example: 350 },
            protein: { type: 'number', example: 12 },
            carbs: { type: 'number', example: 68 },
            fat: { type: 'number', example: 2.5 }
          }
        },
        MealFood: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            date: { type: 'string', format: 'date', example: '2025-05-02' },
            type: { type: 'string', enum: ['breakfast', 'lunch', 'dinner', 'snack', 'other'], example: 'lunch' },
            food_id: { type: 'integer', example: 1 },
            quantity_g: { type: 'number', example: 120 },
            food: { $ref: '#/components/schemas/Food' }
          }
        },
        QuickEntry: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            date: { type: 'string', format: 'date', example: '2025-05-02' },
            type: { type: 'string', enum: ['breakfast', 'lunch', 'dinner', 'snack', 'other'], example: 'dinner' },
            calories: { type: 'number', example: 200 },
            protein: { type: 'number', example: 10 },
            carbs: { type: 'number', example: 25 },
            fat: { type: 'number', example: 5 },
            comment: { type: 'string', example: 'Yaourt rapide' }
          }
        },
        NutritionGoal: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            date: { type: 'string', format: 'date', example: '2025-05-02' },
            calories_goal: { type: 'number', example: 2000 },
            protein_goal: { type: 'number', example: 120 },
            carbs_goal: { type: 'number', example: 250 },
            fat_goal: { type: 'number', example: 60 }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'], // Génère la doc à partir des JSDoc dans les routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
