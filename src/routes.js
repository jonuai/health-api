const express = require("express");
const pool = require("./db");

const router = express.Router();

router.post("/health/ping", async (req, res) => {
  const { service_name, status, message } = req.body;

  await pool.query(
    "INSERT INTO service_health (service_name, status, message) VALUES ($1, $2, $3)",
    [service_name, status, message]
  );

  res.status(201).json({ message: "Health recorded" });
});

router.get("/health/status", async (req, res) => {
  const result = await pool.query(
    "SELECT service_name, status, created_at FROM service_health ORDER BY created_at DESC LIMIT 10"
  );

  res.json(result.rows);
});

router.post("/incidents", async (req, res) => {
  const { service_name, description } = req.body;

  await pool.query(
    "INSERT INTO incidents (service_name, description) VALUES ($1, $2)",
    [service_name, description]
  );

  res.status(201).json({ message: "Incident created" });
});

router.get("/incidents", async (req, res) => {
  const result = await pool.query(
    "SELECT service_name, description, created_at FROM incidents ORDER BY created_at DESC"
  );

  res.json(result.rows);
});

module.exports = router;

