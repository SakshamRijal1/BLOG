const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");


// ========================================
// NORMAL REGISTER / LOGIN
// ========================================

router.post("/register", register);

router.post("/login", login);


// ========================================
// GOOGLE AUTHENTICATION
// ========================================

// Step 1: Send user to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);


// Step 2: Google sends user back here
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/register`,
  }),
  (req, res) => {
    try {
      // Create JWT
      const token = jwt.sign(
        {
          id: req.user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // User information for React
      const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        profileImage: req.user.profileImage || "",
      };

      // Convert user object into URL-safe string
      const userData = encodeURIComponent(
        JSON.stringify(user)
      );

      // Send user back to React
      res.redirect(
        `${process.env.FRONTEND_URL}/auth/google-success?token=${token}&user=${userData}`
      );
    } catch (error) {
      console.error("Google callback error:", error);

      res.redirect(
        `${process.env.FRONTEND_URL}/register`
      );
    }
  }
);


module.exports = router;