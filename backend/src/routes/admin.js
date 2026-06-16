const express = require("express");
const router = express.Router();
const { getAdminDashboardStats } = require("../controllers/adminController");
const { verifyToken, isAdmin } = require("../middleware/auth"); // Pastikan middleware isAdmin ada

router.get("/dashboard-stats", verifyToken, isAdmin, getAdminDashboardStats);

module.exports = router;