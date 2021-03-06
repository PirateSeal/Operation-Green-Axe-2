const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const users = require('../queries/users');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      const email = profile.emails[0].value;

      const googleUser = {
        display_name: profile.displayName,
        email,
        google_id: profile.id,
        image_url: profile.photos[0].value,
      };
      try {
        let user = await users.findByEmail(email);

        if (user) {
          googleUser.admin = user.admin;
          googleUser.role_id = user.role_id;
          googleUser.team_id = user.team_id;

          user = await users.update(user.id, googleUser);
        } else {
          user = await users.insert(googleUser);
        }

        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    },
  ),
);
