const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// API root
app.get("/", (req, res) => {
  res.send("IoT Air Quality API berjalan 🚀");
});

// Simpan data baru (misalnya dari Arduino/ThingSpeak webhook)
app.post("/api/data", (req, res) => {
  const { ppm, kategori } = req.body;
  const waktu = new Date();

  const sql = "INSERT INTO log_udara (ppm, kategori, waktu) VALUES (?, ?, ?)";
  db.query(sql, [ppm, kategori, waktu], (err, result) => {
    if (err) {
      console.error("❌ Gagal insert data:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ message: "Data tersimpan ✅", id: result.insertId });
  });
});

// Ambil semua log
app.get("/api/logs", (req, res) => {
  const sql = "SELECT * FROM log_udara ORDER BY waktu DESC LIMIT 50";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error("❌ Gagal ambil data:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json(rows);
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
