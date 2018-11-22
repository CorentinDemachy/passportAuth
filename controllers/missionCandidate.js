const { MissionCandidate } = require('../models/index');


const listMissionCandidate = (req, res, next) => {
  MissionCandidate.listMissionCandidate().then((missionCandidates) => {
    res.status(200).json(missionCandidates);
  }).catch((err) => {
    next(err);
  });
};

const createMissionCandidate = (req, res, next) => {
  MissionCandidate.createMissionCandidate(req.body).then((missionCandidate) => {
    res.status(200).json(missionCandidate);
  }).catch((err) => {
    next(err);
  });
};

const readMissionCandidate = (req, res, next) => {
  MissionCandidate.readMissionCandidate(req.params.id).then((missionCandidate) => {
    res.status(200).json(missionCandidate);
  }).catch((err) => {
    next(err);
  });
};

const updateMissionCandidate = (req, res, next) => {
  MissionCandidate.updateMissionCandidate(req.body).then((missionCandidate) => {
    res.status(200).json(missionCandidate);
  }).catch((err) => {
    next(err);
  });
};

const deleteMissionCandidate = (req, res, next) => {
  MissionCandidate.deleteMissionCandidate(req.body.id).then((missionCandidate) => {
    res.status(200).json(missionCandidate);
  }).catch((err) => {
    next(err);
  });
};

module.exports = {
  listMissionCandidate,
  createMissionCandidate,
  readMissionCandidate,
  updateMissionCandidate,
  deleteMissionCandidate,
};
