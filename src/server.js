require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const migrate = require("./migrate");

const app = express();
app.use(express.json());
app.use(routes);

const PORT = 5000;

async function start() {
  console.log("Starting Service Health API...");

  // wait for DB (simple but realistic)
  await new Promise(resolve => setTimeout(resolve, 5000));
  await migrate();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running on port ${PORT}`);
  });
}

start().catch(err => {
  console.error("Startup failed:", err);
  process.exit(1);
});

