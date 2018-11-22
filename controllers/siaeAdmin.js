const { SiaeAdmin } = require('../models/index');


const listSiaeAdmin = (req, res, next) => {
  SiaeAdmin.listSiaeAdmin({
    attributes: ['id', 'siaeId', 'email', 'createdAt', 'updatedAt'],
  }).then((siaeAdmins) => {
    res.status(200).json(siaeAdmins);
  }).catch((err) => {
    next(err);
  });
};

const createSiaeAdmin = (req, res, next) => {
  SiaeAdmin.createSiaeAdmin(req.body).then((siaeAdmin) => {
    res.status(200).json(siaeAdmin);
  }).catch((err) => {
    next(err);
  });
};

const readSiaeAdmin = (req, res, next) => {
  SiaeAdmin.readSiaeAdmin(req.params.id, {
    attributes: ['id', 'siaeId', 'email', 'createdAt', 'updatedAt'],
  }).then((siaeAdmin) => {
    res.status(200).json(siaeAdmin);
  }).catch((err) => {
    next(err);
  });
};

const updateSiaeAdmin = (req, res, next) => {
  SiaeAdmin.updateSiaeAdmin(req.body).then((siaeAdmin) => {
    res.status(200).json(siaeAdmin);
  }).catch((err) => {
    next(err);
  });
};

const deleteSiaeAdmin = (req, res, next) => {
  SiaeAdmin.deleteSiaeAdmin(req.body.id).then((siaeAdmin) => {
    res.status(200).json(siaeAdmin);
  }).catch((err) => {
    next(err);
  });
};

module.exports = {
  listSiaeAdmin,
  createSiaeAdmin,
  readSiaeAdmin,
  updateSiaeAdmin,
  deleteSiaeAdmin,
};
