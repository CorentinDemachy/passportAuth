const { sequelize } = require('./constructors/index');

const Company = require('./methods/company');
const CompanyAdmin = require('./methods/companyAdmin');
const CompanyReferent = require('./methods/companyReferent');
const Coworker = require('./methods/coworker');
const CoworkerSkill = require('./methods/coworkerSkill');
const FeedbackCompany = require('./methods/feedbackCompany');
const FeedbackCoworker = require('./methods/feedbackCoworker');
const FeedbackJumper = require('./methods/feedbackJumper');
const Jumper = require('./methods/jumper');
const Mission = require('./methods/mission');
const MissionCandidate = require('./methods/missionCandidate');
const MissionSkill = require('./methods/missionSkill');
const Siae = require('./methods/siae');
const SiaeAdmin = require('./methods/siaeAdmin');
const SiaeReferent = require('./methods/siaeReferent');
const Skill = require('./methods/skill');

const Models = {
  sequelize,
  Company,
  CompanyAdmin,
  CompanyReferent,
  Coworker,
  CoworkerSkill,
  FeedbackCompany,
  FeedbackCoworker,
  FeedbackJumper,
  Jumper,
  Mission,
  MissionCandidate,
  MissionSkill,
  Siae,
  SiaeAdmin,
  SiaeReferent,
  Skill,
};

module.exports = Models;
