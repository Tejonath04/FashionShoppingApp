const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.post('/products', recommendationController.ProductRecommendation);

module.exports = router;
