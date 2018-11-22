const { MissionSkill } = require('../models/index');


const listMissionSkill = (req, res, next) => {
  MissionSkill.listMissionSkill().then((missionSkills) => {
    res.status(200).json(missionSkills);
  }).catch((err) => {
    next(err);
  });
};

const createMissionSkill = (req, res, next) => {
  MissionSkill.createMissionSkill(req.body).then((missionSkill) => {
    res.status(200).json(missionSkill);
  }).catch((err) => {
    next(err);
  });
};

const readMissionSkill = (req, res, next) => {
  MissionSkill.readMissionSkill(req.params.id).then((missionSkill) => {
    res.status(200).json(missionSkill);
  }).catch((err) => {
    next(err);
  });
};

const updateMissionSkill = (req, res, next) => {
  MissionSkill.updateMissionSkill(req.body, req.user.id).then((missionSkill) => {
    res.status(200).json(missionSkill);
  }).catch((err) => {
    next(err);
  });
};

const deleteMissionSkill = (req, res, next) => {
  MissionSkill.deleteMissionSkill(req.body.id).then((missionSkill) => {
    res.status(200).json(missionSkill);
  }).catch((err) => {
    next(err);
  });
};

module.exports = {
  listMissionSkill,
  createMissionSkill,
  readMissionSkill,
  updateMissionSkill,
  deleteMissionSkill,
};
