const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//router.post('/search', productController.loadDataAndSearch);
router.post('/search', productController.loadData);

module.exports = router;
