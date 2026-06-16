const express = require('express');
const router = express.Router();
const { detectTextEmotion, detectFaceEmotion, getEmotionHistory } = require('../controllers/emotionController');
const { verifyToken } = require('../middleware/auth');

// Pastikan ini ada!
router.post('/text', verifyToken, detectTextEmotion); 
router.post('/face', verifyToken, detectFaceEmotion);
router.get('/', verifyToken, getEmotionHistory);

// Tambahkan ini di src/routes/emotion.js
// Ini akan menangkap request ke /api/emotion (tanpa tambahan /text atau /face)
router.post('/', verifyToken, (req, res) => {
    // Jika Anda ingin ini secara default mendeteksi teks
    detectTextEmotion(req, res);
});

module.exports = router;