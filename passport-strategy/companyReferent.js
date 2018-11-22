const passport = require('passport');
const LocalStrategy = require('passport-local');

const { CompanyReferent } = require('../models/index');

passport.use('local_companyReferent', new LocalStrategy({
  usernameField: 'login[email]',
  passwordField: 'login[password]',
}, (username, password, done) => {
  CompanyReferent.findOne({ where: { email: username } }).then((companyReferent) => {
    if (companyReferent) {
      if (companyReferent.validPassword(password)) {
        const data = {
          user: {
            id: companyReferent.id,
            email: companyReferent.email,
            status: 'companyReferent',
          },
          jwt: companyReferent.generateJwt(),
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
