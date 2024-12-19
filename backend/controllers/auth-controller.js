const User = require("../model/user");
const bcrypt = require("bcryptjs");
const {
  generateVerificationToken,
} = require("../utils/generateVerificationToken");
const { generateJWTToken } = require("../utils/generateJWTToken");
const { sendVerificationEmail } = require("../nodemailer/email");
const { sendWelcomeEmail } = require("../nodemailer/email");
const { sendPasswordResetEmail } = require("../nodemailer/email");
const { sendResetSuccessEmail } = require("../nodemailer/email");
const crypto = require("crypto");

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: "All fields are required",
      });
    }

    // check if name is entered or not
    if (!firstName || !lastName) {
      return res.json({
        error: "First name and last name is required",
      });
    }
    // check if password is good not not
    if (!password || password.length < 8) {
      return res.json({
        error: "password should be greater than 8 character",
      });
    }
    //check if email exists or not
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        message: "User already exists",
        error: "email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours,
    });

    await user.save();

    generateJWTToken(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        error: "No user found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials",error: "Invalid credentials" });
    }
    const isVerified = user.isVerified;
    if (!isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Email not verified" });
    }

    generateJWTToken(res, user._id);

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout successful" });
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    await sendWelcomeEmail(user.email, user.firstName);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;

    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
    );

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset password token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ ...user._doc, password: undefined });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
};
