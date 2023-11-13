const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/profileLogging', userController.profileLogging);

module.exports = router;
