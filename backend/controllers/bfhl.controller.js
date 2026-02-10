const { fibonacci, isPrime, hcf, lcm } = require("../utils/math.utils");
const { askAI } = require("../utils/ai.utils");

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL;

const successResponse = (res, data) => {
  return res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL,
    data
  });
};

const errorResponse = (res, status, message) => {
  return res.status(status).json({
    is_success: false,
    official_email: OFFICIAL_EMAIL,
    error: message
  });
};

const bfhlHandler = async (req, res) => {
  try {
    if (!OFFICIAL_EMAIL) {
      return errorResponse(res, 500, "Server misconfiguration");
    }

    if (!req.body || typeof req.body !== "object") {
      return errorResponse(res, 400, "Invalid request body");
    }

    const keys = Object.keys(req.body);

    if (keys.length !== 1) {
      return errorResponse(res, 400, "Only one key is allowed");
    }

    const key = keys[0];
    const value = req.body[key];

    let data;

    switch (key) {
      case "fibonacci":
        if (!Number.isInteger(value) || value < 0) {
          return errorResponse(res, 400, "Invalid fibonacci input");
        }
        data = fibonacci(value);
        break;

      case "prime":
        if (!Array.isArray(value)) {
          return errorResponse(res, 400, "Prime input must be an array");
        }
        data = value.filter(
          (num) => Number.isInteger(num) && isPrime(num)
        );
        break;

      case "lcm":
        if (!Array.isArray(value) || value.length === 0) {
          return errorResponse(res, 400, "LCM input must be a non-empty array");
        }
        data = lcm(value);
        break;

      case "hcf":
        if (!Array.isArray(value) || value.length === 0) {
          return errorResponse(res, 400, "HCF input must be a non-empty array");
        }
        data = hcf(value);
        break;

      case "AI":
        if (typeof value !== "string" || value.trim().length === 0) {
          return errorResponse(res, 400, "AI input must be a string");
        }
        data = await askAI(value);
        break;

      default:
        return errorResponse(res, 400, "Unsupported key");
    }

    return successResponse(res, data);

  } catch (err) {
    return errorResponse(res, 500, "Internal server error");
  }
};

const healthCheck = (req, res) => {
  if (!OFFICIAL_EMAIL) {
    return res.status(500).json({
      is_success: false,
      error: "Server misconfiguration"
    });
  }

  return res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
};

module.exports = { bfhlHandler, healthCheck };
