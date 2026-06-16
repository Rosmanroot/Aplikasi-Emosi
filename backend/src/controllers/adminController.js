const User = require('../models/User'); // Sesuaikan dengan path model Anda
const EmotionHistory = require('../models/EmotionHistory'); 
const Journal = require('../models/Journal');

exports.getAdminDashboardStats = async (req, res) => {
    try {
        // 1. Hitung total user
        const totalUsers = await User.countDocuments();
        
        // 2. Ambil riwayat emosi dan populate usernya
        const emotionHistory = await EmotionHistory.find()
    .populate("user", "username") // Ganti "user" dengan nama field yang benar
    .sort({ createdAt: -1 });

const dailyJournals = await Journal.find()
    .populate("user", "username") // Ganti "user" dengan nama field yang benar
    .sort({ createdAt: -1 });
        
        // KIRIM DATA SESUAI FORMAT YANG DITUNGGU HTML (success: true, data: { ... })
        res.status(200).json({
            success: true,
            data: { 
                totalUsers, 
                emotionHistory, 
                dailyJournals 
            }
        });
    } catch (error) {
        console.error("Error di Admin Controller:", error);
        res.status(500).json({ success: false, message: "Gagal mengambil data statistik." });
    }
};