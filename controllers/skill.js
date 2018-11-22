const { Skill } = require('../models/index');


const listSkill = (req, res, next) => {
  Skill.listSkill().then((skills) => {
    res.status(200).json(skills);
  }).catch((err) => {
    next(err);
  });
};

const createSkill = (req, res, next) => {
  Skill.createSkill(req.body).then((skill) => {
    res.status(200).json(skill);
  }).catch((err) => {
    next(err);
  });
};

const readSkill = (req, res, next) => {
  Skill.readSkill(req.params.id).then((skill) => {
    res.status(200).json(skill);
  }).catch((err) => {
    next(err);
  });
};

const updateSkill = (req, res, next) => {
  Skill.updateSkill(req.body).then((skill) => {
    res.status(200).json(skill);
  }).catch((err) => {
    next(err);
  });
};

const deleteSkill = (req, res, next) => {
  Skill.deleteSkill(req.body.id).then((skill) => {
    res.status(200).json(skill);
  }).catch((err) => {
    next(err);
  });
};

module.exports = {
  listSkill,
  createSkill,
  readSkill,
  updateSkill,
  deleteSkill,
};
