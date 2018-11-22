const { Coworker } = require('../models/index');

const listCoworker = (req, res, next) => {
  Coworker.listCoworker({
    attributes: ['id', 'siaeReferentId', 'siaeId', 'firstName', 'lastName', 'notes', 'email', 'phone', 'isValidated', 'createdAt', 'updatedAt'],
  }).then((coworkers) => {
    res.status(200).json(coworkers);
  }).catch((err) => {
    next(err);
  });
};

const createCoworker = (req, res, next) => {
  const { coworker } = req;
  coworker.password = coworker.email;
  Coworker.createCoworker(coworker).then((createdCoworker) => {
    res.status(200).json(createdCoworker);
  }).catch((err) => {
    next(err);
  });
};

const readCoworker = (req, res, next) => {
  Coworker.readCoworker(req.params.id, {
    attributes: ['id', 'siaeReferentId', 'siaeId', 'firstName', 'lastName', 'notes', 'email', 'phone', 'isValidated', 'createdAt', 'updatedAt'],
  }).then((coworker) => {
    res.status(200).json(coworker);
  }).catch((err) => {
    next(err);
  });
};

const updateCoworker = (req, res, next) => {
  Coworker.updateCoworker(req.body).then((coworker) => {
    res.status(200).json(coworker);
  }).catch((err) => {
    next(err);
  });
};

const deleteCoworker = (req, res, next) => {
  Coworker.deleteCoworker(req.body.id).then((coworker) => {
    res.status(200).json(coworker);
  }).catch((err) => {
    next(err);
  });
};

module.exports = {
  listCoworker,
  createCoworker,
  readCoworker,
  updateCoworker,
  deleteCoworker,
};
