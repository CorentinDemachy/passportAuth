const passport = require('passport');

exports.login = (req, res, next) => {
  const { body: { login } } = req;

  if (!login) {
    return next(new Error('No login data'));
  }
  if (!login.status || login.status === '') {
    res.status(422).json({ message: 'User status is required' });
  }
  if (!login.email) {
    res.status(422).json({ message: 'Email is required' });
  }
  if (!login.password) {
    res.status(422).json({ message: 'Password is required' });
  }

  const strategy = `local_${login.status}`;
  return passport.authenticate(strategy, { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }
    if (passportUser) {
      return res.status(200).json({ user: passportUser.user, jwt: passportUser.jwt });
    }
    return res.status(400).json({ info });
  })(req, res, next);
};
