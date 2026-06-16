// JWT Auth middleware
const jwt = require("jsonwebtoken");

// 1. Middleware untuk memverifikasi token login (Bawaan kode kamu)
const verifyToken = function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ error: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Menyimpan data hasil decode token (id, role, dll) ke req.user
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

// 2. Middleware tambahan untuk mengecek apakah role-nya beneran Admin
const isAdmin = function (req, res, next) {
  // Memastikan data user ada dan rolenya adalah 'admin'
  if (req.user && req.user.role === "admin") {
    next(); // Jika admin, diizinkan lanjut ke controller
  } else {
    res.status(403).json({ error: "Akses ditolak! Halaman ini khusus Admin." });
  }
};

// Ekspor kedua middleware agar bisa dipanggil di tempat lain
module.exports = { verifyToken, isAdmin };