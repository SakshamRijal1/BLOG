const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(
            new Error("Google account email not available"),
            null
          );
        }

        // Check if user already exists
        let user = await User.findOne({ email });

        // If user does not exist, create one
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: email,
            password: null,
            profileImage:
              profile.photos?.[0]?.value || "",
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Google authentication error:", error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;