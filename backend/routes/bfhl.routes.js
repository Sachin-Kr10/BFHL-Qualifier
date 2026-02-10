const express = require("express");
const {
  bfhlHandler,
  healthCheck
} = require("../controllers/bfhl.controller");

const router = express.Router();

router.post("/bfhl", bfhlHandler);
router.get("/health", healthCheck);

module.exports = router;
