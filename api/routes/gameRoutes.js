const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authenticateToken = require('../../config/authMiddleware');

router.post('/', authenticateToken, gameController.createGame);
router.get('/', gameController.getGames);

module.exports = router;
