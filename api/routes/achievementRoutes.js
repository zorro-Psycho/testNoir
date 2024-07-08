const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const authenticateToken = require('../../config/authMiddleware');

router.post('/', authenticateToken, achievementController.createAchievement);
router.get('/', achievementController.getAchievements);

module.exports = router;
