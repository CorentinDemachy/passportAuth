const passport = require('passport');
const LocalStrategy = require('passport-local');

const { SiaeReferent: SiaeReferent } = require('../models/index');

passport.use('local_siaeReferent', new LocalStrategy({
  usernameField: 'login[email]',
  passwordField: 'login[password]',
}, (username, password, done) => {
  SiaeReferent.findOne({ where: { email: username } }).then((siaeReferent) => {
    if (siaeReferent) {
      if (siaeReferent.validPassword(password)) {
        const data = {
          user: {
            id: siaeReferent.id,
            email: siaeReferent.email,
            status: 'siaeReferent',
          },
          jwt: siaeReferent.generateJwt(),
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
