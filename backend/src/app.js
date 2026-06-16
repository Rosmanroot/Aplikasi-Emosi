const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const emotionRoutes = require("./routes/emotion");
const adminRoutes = require("./routes/admin");
// PERBAIKAN 1: Import rute jurnal baru kamu
const journalRoutes = require("./routes/journal"); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Hubungkan ke MongoDB Atlas menggunakan MONGO_URI
const mongoUri = process.env.MONGO_URI;

console.log("-> Mencoba menyambungkan ke MongoDB Atlas via app.js...");

mongoose.connect(mongoUri)
  .then(() => console.log("🔥 BERHASIL! Terhubung ke MongoDB Atlas dengan sempurna!"))
  .catch(err => {
    console.error("❌ Error koneksi MongoDB:");
    console.error(err.message);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/emotion", emotionRoutes);
app.use("/api/admin", adminRoutes);
// PERBAIKAN 2: Aktifkan rute jurnal agar bisa diakses oleh frontend
app.use("/api/journal", journalRoutes); 

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;