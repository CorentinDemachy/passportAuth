const passport = require('passport');
const LocalStrategy = require('passport-local');

const { Coworker } = require('../models/index');

passport.use('local_coworker', new LocalStrategy({
  usernameField: 'login[email]',
  passwordField: 'login[password]',
}, (username, password, done) => {
  Coworker.findOne({ where: { email: username } }).then((coworker) => {
    if (coworker) {
      if (coworker.validPassword(password)) {
        const data = {
          user: {
            id: coworker.id,
            email: coworker.email,
            status: 'coworker',
          },
          jwt: coworker.generateJwt(),
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
