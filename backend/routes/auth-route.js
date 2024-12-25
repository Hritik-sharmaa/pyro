const express = require("express");
const router = express.Router();
const passport = require("passport");
const { register, login, logout, verifyEmail, forgotPassword, resetPassword } = require("../controllers/auth-controller");
const { generateJWTToken } = require("../utils/generateJWTToken");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Google Login
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  // Google Callback
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      session: false, 
    }),
    (req, res) => {
      const token = generateJWTToken(res, req.user._id); 
      res.redirect(`http://localhost:5173?token=${token}`); 
    }
  );

module.exports = router;
