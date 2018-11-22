const router = require('express').Router();
const passport = require('passport');
const Login = require('../controllers/login');

// Routes that do not need auth
router.post('/login', Login.login);

// Routes that does need auth
router.use('*', passport.authenticate('jwt', { session: false }));
router.use('/company', require('./company'));
router.use('/companyAdmin', require('./companyAdmin'));
router.use('/companyreferent', require('./companyReferent'));
router.use('/coworker', require('./coworker'));
router.use('/coworkerskill', require('./coworkerSkill'));
router.use('/feedbackcompany', require('./feedbackCompany'));
router.use('/feedbackcoworker', require('./feedbackCoworker'));
router.use('/feedbackjumper', require('./feedbackJumper'));
router.use('/jumper', require('./jumper'));
router.use('/mission', require('./mission'));
router.use('/missioncandidate', require('./missionCandidate'));
router.use('/missionskill', require('./missionSkill'));
router.use('/siae', require('./siae'));
router.use('/siaeadmin', require('./siaeAdmin'));
router.use('/siaereferent', require('./siaeReferent'));
router.use('/skill', require('./skill'));
module.exports = router;
