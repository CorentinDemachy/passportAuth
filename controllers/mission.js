const { Mission } = require('../models/index');


const listMission = (req, res, next) => {
  Mission.listMission().then((missions) => {
    res.status(200).json(missions);
  }).catch((err) => {
    next(err);
  });
};

const createMission = (req, res, next) => {
  Mission.createMission(req.body).then((mission) => {
    res.status(200).json(mission);
  }).catch((err) => {
    next(err);
  });
};

const readMission = (req, res, next) => {
  Mission.readMission(req.params.id).then((mission) => {
    res.status(200).json(mission);
  }).catch((err) => {
    next(err);
  });
};

const updateMission = (req, res, next) => {
  Mission.updateMission(req.body, req.user.id).then((mission) => {
    res.status(200).json(mission);
  }).catch((err) => {
    next(err);
  });
};

const deleteMission = (req, res, next) => {
  Mission.deleteMission(req.body.id).then((mission) => {
    res.status(200).json(mission);
  }).catch((err) => {
    next(err);
  });
};

module.exports = {
  listMission,
  createMission,
  readMission,
  updateMission,
  deleteMission,
};
