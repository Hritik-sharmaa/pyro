const express = require("express");
const router = express.Router();
const { register, login, logout, verifyEmail, forgotPassword, resetPassword } = require("../controllers/auth-controller");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
