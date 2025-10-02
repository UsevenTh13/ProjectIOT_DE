const mysql = require("mysql2");

// Buat koneksi ke database
const db = mysql.createPool({
  host: "localhost",     // ganti sesuai server MySQL
  user: "root",          // username MySQL Anda
  password: "",          // password MySQL Anda
  database: "iot_air",   // nama database
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Tes koneksi
db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ Gagal koneksi MySQL:", err);
  } else {
    console.log("✅ Terkoneksi ke MySQL");
    conn.release();
  }
});

module.exports = db;
