const passport = require('passport');
const LocalStrategy = require('passport-local');
const { CompanyAdmin } = require('../models/index');

passport.use('local_companyAdmin', new LocalStrategy({
  usernameField: 'login[email]',
  passwordField: 'login[password]',
}, (username, password, done) => {
  CompanyAdmin.findOne({ where: { email: username } }).then((companyAdmin) => {
    if (companyAdmin) {
      if (companyAdmin.validPassword(password)) {
        const data = {
          user: {
            id: companyAdmin.id,
            email: companyAdmin.email,
            status: 'companyAdmin',
          },
          jwt: companyAdmin.generateJwt(),
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
