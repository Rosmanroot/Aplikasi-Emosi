require('dotenv').config();
const app = require('./src/app'); // Import app yang sudah berisi semua rute

// Cukup pasang logging di sini jika perlu, tapi rute JANGAN diulang
app.use((req, res, next) => {
    console.log(`Request diterima: ${req.method} ${req.url}`);
    next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});