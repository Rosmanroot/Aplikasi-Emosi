const User = require('../models/User'); // Pastikan path model User sudah benar
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fungsi Registrasi
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        error: "Username sudah digunakan"
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashed,
      role: "user" // Default role sebagai user biasa
    });

    await user.save();

    res.status(201).json({
      message: "Registrasi berhasil"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// Fungsi Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cari user berdasarkan username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Username atau password salah" });
    }

    // Validasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Username atau password salah" });
    }

    // Buat token JWT (Gunakan secret key dari .env atau default)
    const tokenSecret = process.env.JWT_SECRET || 'secret_emosync_key';
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      tokenSecret,
      { expiresIn: '1d' }
    );

    // Kirim response data ke frontend termasuk role untuk hak akses admin
    res.status(200).json({
      message: "Login berhasil",
      token,
      username: user.username,
      role: user.role
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// Ekspor semua fungsi dalam satu objek (Gaya ES6 Destructuring)
module.exports = {
  register,
  login
};