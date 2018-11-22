const passport = require('passport');

require('./siaeReferent');
require('./companyAdmin');
require('./companyReferent');
require('./coworker');
require('./siaeAdmin');
require('./jumper');

require('./jwt');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
