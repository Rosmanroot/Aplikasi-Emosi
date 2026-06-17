require('dotenv').config();
const cors = require('cors'); // 1. Import cors
const app = require('./src/app'); 

// 2. Gunakan middleware cors
// Ini akan mengizinkan semua domain untuk mengakses backend Anda
app.use(cors()); 

// Logging middleware
app.use((req, res, next) => {
    console.log(`Request diterima: ${req.method} ${req.url}`);
    next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});