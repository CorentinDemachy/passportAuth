const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

const config = require('config');

const {
  CompanyAdmin, CompanyReferent, Coworker, Jumper, SiaeAdmin, SiaeReferent,
} = require('../models/index');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('tokenData').tokenSecret,
};

const getModelFromStatus = (status) => {
  switch (status) {
    case 'companyAdmin':
      return CompanyAdmin;
    case 'companyReferent':
      return CompanyReferent;
    case 'coworker':
      return Coworker;
    case 'jumper':
      return Jumper;
    case 'siaeAdmin':
      return SiaeAdmin;
    case 'siaeReferent':
      return SiaeReferent;
    default:
      return Coworker;
  }
};

passport.use('jwt', new JwtStrategy(opts, ((jwtPayload, done) => {
  const { status } = jwtPayload;
  const model = getModelFromStatus(status);
  model.findByPk(jwtPayload.id).then((user) => {
    if (user) {
      return done(null, user);
    }
    return done(new Error('User not found for given token'), null);
  }).catch((err) => {
    done(err, null);
  });
})));
