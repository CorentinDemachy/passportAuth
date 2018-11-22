const passport = require('passport');
const LocalStrategy = require('passport-local');

const { Jumper } = require('../models/index');

passport.use('local_jumper', new LocalStrategy({
  usernameField: 'login[email]',
  passwordField: 'login[password]',
}, (username, password, done) => {
  Jumper.findOne({ where: { email: username } }).then((jumper) => {
    if (jumper) {
      if (jumper.validPassword(password)) {
        const data = {
          user: {
            id: jumper.id,
            email: jumper.email,
            status: 'jumper',
          },
          jwt: jumper.generateJwt(),
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
