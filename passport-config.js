const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} = require("./config");
const Usuario = require("./models/Usuario");

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
          usuario = new Usuario({
            nombre: profile.displayName,
            email: email,
            password: "google-oauth",
          });
          await usuario.save();
        }

        return done(null, usuario);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;