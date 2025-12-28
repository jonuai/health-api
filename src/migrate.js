const pool = require("./db");

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS service_health (
      id SERIAL PRIMARY KEY,
      service_name TEXT NOT NULL,
      status TEXT NOT NULL,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS incidents (
      id SERIAL PRIMARY KEY,
      service_name TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Database migrated");
}

module.exports = migrate;

