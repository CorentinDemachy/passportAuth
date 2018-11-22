const { Mission } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Function
const updateMission = (mission, data) => {
  const newMission = mission;
  if (data.coworkerId) {
    newMission.coworkerId = data.coworkerId;
  }
  if (data.siaeReferentId) {
    newMission.siaeReferentId = data.siaeReferentId;
  }
  if (data.companyReferentId) {
    newMission.companyReferentId = data.companyReferentId;
  }
  if (data.startDate) {
    newMission.startDate = data.startDate;
  }
  if (data.endDate) {
    newMission.endDate = data.endDate;
  }
  if (data.totalHours) {
    newMission.totalHours = data.totalHours;
  }
  if (data.location) {
    newMission.location = data.location;
  }
  if (data.title) {
    newMission.name = data.name;
  }
  if (data.description) {
    newMission.description = data.description;
  }
  if (data.status) {
    newMission.status = data.status;
  }
  if (data.missionStatus) {
    newMission.missionStatus = data.missionStatus;
  }

  return newMission;
};

// Static Methods
Mission.listMission = options => new Promise(((resolve) => {
  Mission.sync().then(() => {
    Mission.findAll(options).then((missions) => {
      resolve(missions);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Mission.createMission = mission => new Promise(((resolve) => {
  Mission.sync().then(() => {
    Mission.create({
      id: idGenerator(),
      coworkerId: mission.coworkerId,
      companyId: mission.companyId,
      companyReferentId: mission.companyReferentId,
      startDate: mission.startDate,
      endDate: mission.endDate,
      totalHours: mission.totalHours,
      location: mission.location,
      name: mission.name,
      description: mission.description,
      status: mission.status,
    }).then((createdMission) => {
      resolve(createdMission);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Mission.readMission = (missionId, options) => new Promise(((resolve) => {
  Mission.sync().then(() => {
    Mission.findByPk(missionId, options).then((mission) => {
      resolve(mission);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Mission.updateMission = data => new Promise(((resolve) => {
  Mission.sync().then(() => {
    Mission.findByPk(data.id).then((mission) => {
      mission.save(updateMission(mission, data)).then((updatedMission) => {
        resolve(updatedMission);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Mission.deleteMission = missionId => new Promise(((resolve) => {
  Mission.sync().then(() => {
    Mission.findByPk(missionId).then((mission) => {
      mission.destroy().then((deletedMission) => {
        if (deletedMission && deletedMission.deletedAt) {
          resolve(deletedMission);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

module.exports = Mission;
