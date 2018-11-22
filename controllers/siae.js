const { Siae, SiaeAdmin } = require('../models/index');

const listSiae = (req, res, next) => {
  Siae.listSiae({
    include: [
      {
        model: SiaeAdmin,
        attributes: ['id', 'siaeId', 'email', 'createdAt', 'updatedAt'],
      },
    ],
  }).then((siaes) => {
    res.status(200).json(siaes);
  }).catch(err => next(err));
};

const createSiae = (req, res, next) => {
  Siae.createSiae(req.body).then((siae) => {
    const siaeAdmin = {
      email: `${siae.name}@email.com`,
      password: siae.name,
      siaeId: siae.id,
    };
    SiaeAdmin.createSiaeAdmin(siaeAdmin).then((siaes) => {
      res.status(200).json(siaes);
    }).catch((err) => {
      next(err);
    });
  });
};

const readSiae = (req, res, next) => {
  Siae.readSiae(req.params.id, {
    include: [
      {
        model: SiaeAdmin,
        attributes: ['id', 'siaeId', 'email', 'createdAt', 'updatedAt'],
      },
    ],
  }).then((siae) => {
    res.status(200).json(siae);
  }).catch(err => next(err));
};

const updateSiae = (req, res, next) => {
  Siae.updateSiae(req.body).then((siae) => {
    res.status(200).json(siae);
  }).catch(err => next(err));
};

const deleteSiae = (req, res, next) => {
  Siae.deleteSiae(req.body.id).then((siae) => {
    res.status(200).json(siae);
  }).catch(err => next(err));
};

module.exports = {
  listSiae,
  createSiae,
  readSiae,
  updateSiae,
  deleteSiae,
};
