const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

exports.generateJWTToken = (res, userId, firstName, email) => {
  console.log("jwt secert: ", process.env.JWT_SECRET);
  const token = jwt.sign(
    {
      userId,
      firstName,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  console.log("Generated JWT Token: ", token);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  });
  return token;
};
