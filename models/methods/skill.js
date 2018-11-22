const { Skill } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Function
const updateSkill = (skill, data) => {
  const newSkill = skill;
  if (data.name) {
    newSkill.name = data.name;
  }
  if (data.category) {
    newSkill.category = data.category;
  }

  return newSkill;
};

// Static Methods
Skill.listSkill = options => new Promise(((resolve) => {
  Skill.sync().then(() => {
    Skill.findAll(options).then((skills) => {
      resolve(skills);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Skill.createSkill = skill => new Promise(((resolve) => {
  Skill.sync().then(() => {
    Skill.create({
      id: idGenerator(),
      name: skill.name,
    }).then((createdSkill) => {
      resolve(createdSkill);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Skill.readSkill = (skillId, options) => new Promise(((resolve) => {
  Skill.sync().then(() => {
    Skill.findByPk(skillId, options).then((skill) => {
      resolve(skill);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Skill.updateSkill = data => new Promise(((resolve) => {
  Skill.sync().then(() => {
    Skill.findByPk(data.id).then((skill) => {
      skill.save(updateSkill(skill, data)).then((updatedSkill) => {
        resolve(updatedSkill);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Skill.deleteSkill = skillId => new Promise(((resolve) => {
  Skill.sync().then(() => {
    Skill.findByPk(skillId).then((skill) => {
      skill.destroy().then((deletedSkill) => {
        if (deletedSkill && deletedSkill.deletedAt) {
          resolve(deletedSkill);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));



module.exports = Skill;
