const Journal = require('../models/Journal');

exports.createJournal = async (req, res) => {
    try {
        // Log untuk debug di terminal
        console.log("User data dari token:", req.user); 

        // Pastikan kita mengambil ID dengan benar
        // Jika di authController saat login Anda menyimpan token sbg { user: { id: '...' } },
        // maka gunakan req.user.user.id atau sesuaikan dengan struktur token Anda.
        const userId = req.user.id || req.user.user?.id; 

        if (!userId) {
            return res.status(400).json({ error: "User ID tidak ditemukan di token" });
        }

        const newJournal = new Journal({
            content: req.body.content,
            emotion: req.body.emotion,
            date: req.body.date || new Date(),
            user: userId // Menghubungkan jurnal dengan user
        });

        await newJournal.save();
        res.status(201).json(newJournal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getJournals = async (req, res) => {
    try {
        const userId = req.user.id || req.user.user?.id;
        const journals = await Journal.find({ user: userId }).sort({ createdAt: -1 });
        res.json(journals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};