const { CoworkerSkill } = require('../models/index');


const listCoworkerSkill = (req, res, next) => {
  CoworkerSkill.listCoworkerSkill().then((coworkerSkills) => {
    res.status(200).json(coworkerSkills);
  }).catch((err) => {
    next(err);
  });
};

const createCoworkerSkill = (req, res, next) => {
  CoworkerSkill.createCoworkerSkill(req.body).then((coworkerSkill) => {
    res.status(200).json(coworkerSkill);
  }).catch((err) => {
    next(err);
  });
};

const readCoworkerSkill = (req, res, next) => {
  CoworkerSkill.readCoworkerSkill(req.params.id).then((coworkerSkill) => {
    res.status(200).json(coworkerSkill);
  }).catch((err) => {
    next(err);
  });
};

const updateCoworkerSkill = (req, res, next) => {
  CoworkerSkill.updateCoworkerSkill(req.body, req.user.id).then((coworkerSkill) => {
    res.status(200).json(coworkerSkill);
  }).catch((err) => {
    next(err);
  });
};

const deleteCoworkerSkill = (req, res, next) => {
  CoworkerSkill.deleteCoworkerSkill(req.body.id).then((coworkerSkill) => {
    res.status(200).json(coworkerSkill);
  }).catch((err) => {
    next(err);
  });
};

module.exports = {
  listCoworkerSkill,
  createCoworkerSkill,
  readCoworkerSkill,
  updateCoworkerSkill,
  deleteCoworkerSkill,
};
