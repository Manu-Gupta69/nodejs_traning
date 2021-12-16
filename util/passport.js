const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv").config();

const User = require("../model/user");

passport.serializeUser((user, done) => {
  console.log("reached");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ where: { id: id } });

    if (user) {
      done(null, user);
      return;
    }
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/redirect",
    },
    async (accessToken, refreshToken, profile, callback) => {
      try {
        const googleid = profile.id.toString();
        const user = await User.findOne({ where: { providerid: googleid } });

        if (!user) {
          const newUser = await User.create({
            username: profile.displayName,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: null,
            providerid: googleid,
          });

          callback(null, newUser.dataValues);
        } else {
          callback(null, user.dataValues);
        }
      } catch (err) {
        callback(null, false);
      }
    }
  )
);
