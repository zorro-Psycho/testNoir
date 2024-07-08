const express = require('express');
const router = express.Router();
const nftController = require('../controllers/nftController');
const authenticateToken = require('../../config/authMiddleware');

router.post('/', authenticateToken, nftController.createNFT);
router.get('/', nftController.getNFTs);
router.post('/transaction', authenticateToken, nftController.createTransaction);

module.exports = router;
