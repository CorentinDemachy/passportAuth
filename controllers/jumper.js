const { Jumper } = require('../models/index');

const listJumper = (req, res, next) => {
  Jumper.listJumper({
    attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'isSuperAdmin', 'createdAt', 'updatedAt'],
  }).then((jumpers) => {
    res.status(200).json(jumpers);
  }).catch((err) => {
    next(err);
  });
};

const createJumper = (req, res, next) => {
  const jumper = req.body;
  jumper.password = jumper.email;
  Jumper.createJumper(jumper).then((createdJumper) => {
    res.status(200).json(createdJumper);
  }).catch((err) => {
    next(err);
  });
};

const readJumper = (req, res, next) => {
  Jumper.readJumper(req.params.id, {
    attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'isSuperAdmin', 'createdAt', 'updatedAt'],
  }).then((jumper) => {
    res.status(200).json(jumper);
  }).catch((err) => {
    next(err);
  });
};

const updateJumper = (req, res, next) => {
  Jumper.updateJumper(req.body).then((jumper) => {
    res.status(200).json(jumper);
  }).catch((err) => {
    next(err);
  });
};

const deleteJumper = (req, res, next) => {
  Jumper.deleteJumper(req.body.id).then((jumper) => {
    res.status(200).json(jumper);
  }).catch((err) => {
    next(err);
  });
};

module.exports = {
  listJumper,
  createJumper,
  readJumper,
  updateJumper,
  deleteJumper,
};
