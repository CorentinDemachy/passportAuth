const { SiaeReferent } = require('../models/index');


const listSiaeReferent = (req, res, next) => {
  SiaeReferent.listSiaeReferent({
    attributes: ['id', 'siaeId', 'firstName', 'lastName', 'email', 'phone', 'createdAt', 'updatedAt'],
  }).then((siaeReferents) => {
    res.status(200).json(siaeReferents);
  }).catch((err) => {
    next(err);
  });
};

const createSiaeReferent = (req, res, next) => {
  SiaeReferent.createSiaeReferent(req.body).then((siaeReferent) => {
    res.status(200).json(siaeReferent);
  }).catch((err) => {
    next(err);
  });
};

const readSiaeReferent = (req, res, next) => {
  SiaeReferent.readSiaeReferent(req.params.id, {
    attributes: ['id', 'siaeId', 'firstName', 'lastName', 'email', 'phone', 'createdAt', 'updatedAt'],
  }).then((siaeReferent) => {
    res.status(200).json(siaeReferent);
  }).catch((err) => {
    next(err);
  });
};

const updateSiaeReferent = (req, res, next) => {
  SiaeReferent.updateSiaeReferent(req.body, req.user.id).then((siaeReferent) => {
    res.status(200).json(siaeReferent);
  }).catch((err) => {
    next(err);
  });
};

const deleteSiaeReferent = (req, res, next) => {
  SiaeReferent.deleteSiaeReferent(req.body.id).then((siaeReferent) => {
    res.status(200).json(siaeReferent);
  }).catch((err) => {
    next(err);
  });
};

module.exports = {
  listSiaeReferent,
  createSiaeReferent,
  readSiaeReferent,
  updateSiaeReferent,
  deleteSiaeReferent,
};
