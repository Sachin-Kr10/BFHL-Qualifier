const express = require("express");
const cors = require("cors");

const bfhlRoutes = require("./routes/bfhl.routes");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json({ limit: "10kb" }));

app.use("/", bfhlRoutes);

app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    error: "Route not found"
  });
});

module.exports = app;
