const { MissionCandidate } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Function
const updateMissionCandidate = (missionCandidate, data) => {
  const newMissionCandidate = missionCandidate;
  if (data.status) {
    newMissionCandidate.status = data.status;
  }
  return newMissionCandidate;
};

// Static methods
MissionCandidate.listMissionCandidate = options => new Promise(((resolve) => {
  MissionCandidate.sync().then(() => {
    MissionCandidate.findAll(options).then((missionCandidates) => {
      resolve(missionCandidates);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

MissionCandidate.createMissionCandidate = missionCandidate => new Promise(((resolve) => {
  MissionCandidate.sync().then(() => {
    MissionCandidate.create({
      id: idGenerator(),
      missionId: missionCandidate.missionId,
      skillId: missionCandidate.skillId,
    }).then((createdMissionCandidate) => {
      resolve(createdMissionCandidate);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

MissionCandidate.readMissionCandidate = (missionCandidateId, options) => new Promise(((resolve) => {
  MissionCandidate.sync().then(() => {
    MissionCandidate.findByPk(missionCandidateId, options).then((missionCandidate) => {
      resolve(missionCandidate);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

MissionCandidate.updateMissionCandidate = data => new Promise(((resolve) => {
  MissionCandidate.sync().then(() => {
    MissionCandidate.findByPk(data.id).then((missionCandidate) => {
      missionCandidate.save(updateMissionCandidate(missionCandidate, data)).then((updatedMissionCandidate) => {
        resolve(updatedMissionCandidate);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

MissionCandidate.deleteMissionCandidate = missionCandidateId => new Promise(((resolve) => {
  MissionCandidate.sync().then(() => {
    MissionCandidate.findByPk(missionCandidateId).then((missionCandidate) => {
      missionCandidate.destroy().then((deletedMissionCandidate) => {
        if (deletedMissionCandidate && deletedMissionCandidate.deletedAt) {
          resolve(deletedMissionCandidate);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

module.exports = MissionCandidate;
