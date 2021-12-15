const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv").config();

const User = require("../model/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ where: { id: id } });

  if (user) {
    done(null, user);
    return;
  }

  done(null, null);
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
        console.log(profile);
        if (!user) {
          const newUser = await User.create({
            username: profile.displayName,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: null,
            providerid: profile.id,
          });

          callback(null, newUser.dataValues);
        } else {
          callback(null, user.dataValues);
        }
      } catch (err) {
        callback(err, null);
      }
    }
  )
);
