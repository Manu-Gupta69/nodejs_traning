const passport = require("passport");
const facebookStrategy = require("passport-facebook");
const dotenv = require("dotenv").config();

const User = require("../model/user");

passport.serializeUser((user, done) => {
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
  new facebookStrategy(
    {
      clientID: "509844736798796",
      clientSecret: "8afb9391f559d40dd3e43ab2ed2fbd67",
      callbackURL: "http://localhost:3000/api/auth/facebook/redirect",
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, callback) => {
      try {
        const facebookid = profile.id.toString();
        const user = await User.findOne({ where: { providerid: facebookid } });

        if (!user) {
          const newUser = await User.create({
            username: profile.displayName,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: null,
            providerid: facebookid,
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
