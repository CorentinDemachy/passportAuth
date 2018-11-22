const { MissionSkill } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Function
const updateMissionSkill = (missionSkill, data) => {
  const newMissionSkill = missionSkill;
  if (data.skillId) {
    newMissionSkill.skillId = data.skillId;
  }
  if (data.missionId) {
    newMissionSkill.missionId = data.missionId;
  }
  return newMissionSkill;
};

// Static methods
MissionSkill.listMissionSkill = options => new Promise(((resolve) => {
  MissionSkill.sync().then(() => {
    MissionSkill.findAll(options).then((missionSkills) => {
      resolve(missionSkills);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

MissionSkill.createMissionSkill = missionSkill => new Promise(((resolve) => {
  MissionSkill.sync().then(() => {
    MissionSkill.create({
      id: idGenerator(),
      missionId: missionSkill.missionId,
      skillId: missionSkill.skillId,
    }).then((createdMissionSkill) => {
      resolve(createdMissionSkill);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

MissionSkill.readMissionSkill = (missionSkillId, options) => new Promise(((resolve) => {
  MissionSkill.sync().then(() => {
    MissionSkill.findByPk(missionSkillId, options).then((missionSkill) => {
      resolve(missionSkill);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

MissionSkill.updateMissionSkill = data => new Promise(((resolve) => {
  MissionSkill.sync().then(() => {
    MissionSkill.findByPk(data.id).then((missionSkill) => {
      missionSkill.save(updateMissionSkill(missionSkill, data)).then((updatedMissionSkill) => {
        resolve(updatedMissionSkill);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

MissionSkill.deleteMissionSkill = missionSkillId => new Promise(((resolve) => {
  MissionSkill.sync().then(() => {
    MissionSkill.findByPk(missionSkillId).then((missionSkill) => {
      missionSkill.destroy().then((deletedMissionSkill) => {
        if (deletedMissionSkill && deletedMissionSkill.deletedAt) {
          resolve(deletedMissionSkill);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

module.exports = MissionSkill;
