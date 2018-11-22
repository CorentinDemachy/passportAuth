const passport = require('passport');
const LocalStrategy = require('passport-local');

const { SiaeAdmin } = require('../models/index');

passport.use('local_siaeAdmin', new LocalStrategy({
  usernameField: 'login[email]',
  passwordField: 'login[password]',
}, (username, password, done) => {
  SiaeAdmin.findOne({ where: { email: username } }).then((siaeAdmin) => {
    if (siaeAdmin) {
      if (siaeAdmin.validPassword(password)) {
        const data = {
          user: {
            id: siaeAdmin.id,
            email: siaeAdmin.email,
            status: 'siaeAdmin',
          },
          jwt: siaeAdmin.generateJwt(),
        };

        return done(null, data);
      }
      return done(new Error('Wrong credentials'), null);
    }
    return done(new Error('User not found'), null);
  }).catch((err) => {
    done(err, null);
  });
}));
