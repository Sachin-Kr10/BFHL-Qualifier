const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const bfhlRoutes = require("./routes/bfhl.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", bfhlRoutes);

app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    error: "Route not found"
  });
});

module.exports = app;
