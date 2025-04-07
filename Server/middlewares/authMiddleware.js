const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireSignIn = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }

    // Verify the token
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    //(error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Admin access middleware
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (error) {
    //(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Middleware",
    });
  }
};

module.exports = {
  requireSignIn,
  isAdmin,
};