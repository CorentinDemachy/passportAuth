const checkStatus = requiredStatus => (req, res, next) => {
  const { status, isSuperAdmin } = req.user;
  if (isSuperAdmin) {
    return next();
  }
  for (let i = 0; i < requiredStatus.length; i += 1) {
    const s = requiredStatus[i];
    if (s === status) {
      return next();
    }
  }
  const error = new Error('You cannot perform this action');
  error.code = 403;
  return next(error);
};

exports.auth = {
  superAdmin: checkStatus([]),
  jumper: checkStatus(['jumper']),
  siaeAdmin: checkStatus(['siaeAdmin']),
  siaeReferent: checkStatus(['siaeReferent']),
  companyAdmin: checkStatus(['companyAdmin']),
  companyReferent: checkStatus(['companyReferent']),
  coworker: checkStatus(['coworker']),
  jumperSiae: checkStatus(['jumper', 'siaeAdmin', 'siaeReferent']),
  jumperCompanyReferent: checkStatus(['jumper', 'companyReferent']),
  jumperCompany: checkStatus(['jumper', 'companyAdmin', 'companyReferent']),
};
