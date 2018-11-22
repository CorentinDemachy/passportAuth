
const { CoworkerSkill } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Function
const updateCoworkerSkill = (coworkerSkill, data) => {
  const newCoworkerSkill = coworkerSkill;
  if (data.level) {
    newCoworkerSkill.level = data.level;
  }

  return newCoworkerSkill;
};

// Static methods
CoworkerSkill.listCoworkerSkill = options => new Promise(((resolve) => {
  CoworkerSkill.sync().then(() => {
    CoworkerSkill.findAll(options).then((coworkerSkills) => {
      resolve(coworkerSkills);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

CoworkerSkill.createCoworkerSkill = coworkerSkill => new Promise(((resolve) => {
  CoworkerSkill.sync().then(() => {
    CoworkerSkill.create({
      id: idGenerator(),
      coworkerId: coworkerSkill.coworkerId,
      skillId: coworkerSkill.skillId,
      level: coworkerSkill.level,
    }).then((createdCoworkerSkill) => {
      resolve(createdCoworkerSkill);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

CoworkerSkill.readCoworkerSkill = (coworkerSkillId, options) => new Promise(((resolve) => {
  CoworkerSkill.sync().then(() => {
    CoworkerSkill.findByPk(coworkerSkillId, options).then((coworkerSkill) => {
      resolve(coworkerSkill);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

CoworkerSkill.updateCoworkerSkill = data => new Promise(((resolve) => {
  CoworkerSkill.sync().then(() => {
    CoworkerSkill.findByPk(data.id).then((coworkerSkill) => {
      coworkerSkill.save(updateCoworkerSkill(coworkerSkill, data)).then((updatedCoworkerSkill) => {
        resolve(updatedCoworkerSkill);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

CoworkerSkill.deleteCoworkerSkill = coworkerSkillId => new Promise(((resolve) => {
  CoworkerSkill.sync().then(() => {
    CoworkerSkill.findByPk(coworkerSkillId).then((coworkerSkill) => {
      coworkerSkill.destroy().then((deletedCoworkerSkill) => {
        if (deletedCoworkerSkill && deletedCoworkerSkill.deletedAt) {
          resolve(deletedCoworkerSkill);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

module.exports = CoworkerSkill;
