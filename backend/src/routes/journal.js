const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const { verifyToken } = require('../middleware/auth');

// Gunakan verifyToken untuk mengamankan route
router.post('/', verifyToken, journalController.createJournal);
router.get('/', verifyToken, journalController.getJournals);

module.exports = router;