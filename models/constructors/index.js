const Sequelize = require('sequelize');
const config = require('config');

const companyConstructor = require('./sequelize-constructors/company');
const companyAdminConstructor = require('./sequelize-constructors/companyAdmin');
const companyReferentConstructor = require('./sequelize-constructors/companyReferent');
const coworkerConstructor = require('./sequelize-constructors/coworker');
const coworkerSkillConstructor = require('./sequelize-constructors/coworkerSkill');
const feedbackCompanyConstructor = require('./sequelize-constructors/feedbackCompany');
const feedbackCoworkerConstructor = require('./sequelize-constructors/feedbackCoworker');
const feedbackJumperConstructor = require('./sequelize-constructors/feedbackJumper');
const jumperConstructor = require('./sequelize-constructors/jumper');
const missionConstructor = require('./sequelize-constructors/mission');
const missionCandidate = require('./sequelize-constructors/missionCandidate');
const missionSkillConstructor = require('./sequelize-constructors/missionSkill');
const siaeConstructor = require('./sequelize-constructors/siae');
const siaeAdminConstructor = require('./sequelize-constructors/siaeAdmin');
const siaeReferentConstructor = require('./sequelize-constructors/siaeReferent');
const skillConstructor = require('./sequelize-constructors/skill');

// Sequelize connection
const dbconfig = config.get('dbConfig');
const sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
  host: dbconfig.host,
  dialect: 'mysql',
  operatorsAliases: false,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Models
const Company = companyConstructor(sequelize);
const CompanyAdmin = companyAdminConstructor(sequelize);
const CompanyReferent = companyReferentConstructor(sequelize);
const Coworker = coworkerConstructor(sequelize);
const CoworkerSkill = coworkerSkillConstructor(sequelize);
const FeedbackCompany = feedbackCompanyConstructor(sequelize);
const FeedbackCoworker = feedbackCoworkerConstructor(sequelize);
const FeedbackJumper = feedbackJumperConstructor(sequelize);
const Jumper = jumperConstructor(sequelize);
const Mission = missionConstructor(sequelize);
const MissionCandidate = missionCandidate(sequelize);
const MissionSkill = missionSkillConstructor(sequelize);
const Siae = siaeConstructor(sequelize);
const SiaeAdmin = siaeAdminConstructor(sequelize);
const SiaeReferent = siaeReferentConstructor(sequelize);
const Skill = skillConstructor(sequelize);


// belongsTo constraints
CompanyAdmin.belongsTo(Company, { foreignKey: 'companyId', targetKey: 'id' });
CompanyReferent.belongsTo(Company, { foreignKey: 'companyId', targetKey: 'id' });
Coworker.belongsTo(Siae, { foreignKey: 'siaeId', targetKey: 'id' });
Coworker.belongsTo(SiaeReferent, { foreignKey: 'siaeReferentId', targetKey: 'id' });
CoworkerSkill.belongsTo(Coworker, { foreignKey: 'coworkerId', targetKey: 'id' });
CoworkerSkill.belongsTo(Skill, { foreignKey: 'skillId', targetKey: 'id' });
FeedbackCompany.belongsTo(Mission, { foreignKey: 'missionId', targetKey: 'id' });
FeedbackCoworker.belongsTo(Mission, { foreignKey: 'missionId', targetKey: 'id' });
FeedbackJumper.belongsTo(Mission, { foreignKey: 'missionId', targetKey: 'id' });
Mission.belongsTo(Company, { foreignKey: 'companyId', targetKey: 'id' });
Mission.belongsTo(Coworker, { foreignKey: 'coworkerId', targetKey: 'id' });
Mission.belongsTo(CompanyReferent, { foreignKey: 'companyReferentId', targetKey: 'id' });
Mission.belongsTo(SiaeReferent, { foreignKey: 'siaeReferentId', targetKey: 'id' });
MissionCandidate.belongsTo(Mission, { foreignKey: 'missionId', targetKey: 'id' });
MissionCandidate.belongsTo(Coworker, { foreignKey: 'coworkerId', targetKey: 'id' });
MissionSkill.belongsTo(Mission, { foreignKey: 'missionId', targetKey: 'id' });
MissionSkill.belongsTo(Skill, { foreignKey: 'skillId', targetKey: 'id' });
SiaeAdmin.belongsTo(Siae, { foreignKey: 'siaeId', targetKey: 'id' });
SiaeReferent.belongsTo(Siae, { foreignKey: 'siaeId', targetKey: 'id' });

// hasMany constraints
Company.hasMany(CompanyAdmin, { foreignKey: 'companyId' });
Siae.hasMany(SiaeAdmin, { foreignKey: 'siaeId' });
Siae.hasMany(SiaeReferent, { foreignKey: 'siaeId' });


module.exports = {
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
