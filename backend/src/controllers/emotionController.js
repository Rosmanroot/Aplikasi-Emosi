// Emotion controller
const EmotionHistory = require("../models/EmotionHistory");
const nlp = require("../utils/nlp");

exports.detectTextEmotion = async (req, res) => {
  try {
    const { text } = req.body;
    const emotion = nlp.analyzeEmotion(text);
    await EmotionHistory.create({ user: req.user.id, type: "text", emotion });
    res.json({ emotion });
  } catch (error) {
    res.status(500).json({ message: "Gagal mendeteksi emosi teks" });
  }
};

exports.detectFaceEmotion = async (req, res) => {
  try {
    const { emotion } = req.body;
    await EmotionHistory.create({ user: req.user.id, type: "face", emotion });
    res.json({ emotion });
  } catch (error) {
    res.status(500).json({ message: "Gagal menyimpan emosi wajah" });
  }
};

exports.getEmotionHistory = async (req, res) => {
    try {
        // Mengambil data dan mengurutkan dari yang terbaru
        const history = await EmotionHistory.find({ user: req.user.id }).sort({ createdAt: -1 });
        
        // DIBUNGKUS DALAM OBJECT { data } agar sinkron dengan index.html Anda
        res.status(200).json({ data: history }); 
    } catch (error) {
        console.error("Error getEmotionHistory:", error);
        res.status(500).json({ message: "Gagal mengambil riwayat" });
    }
};