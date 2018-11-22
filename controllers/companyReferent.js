const { CompanyReferent } = require('../models/index');


const listCompanyReferent = (req, res, next) => {
  CompanyReferent.listCompanyReferent({
    attributes: ['id', 'companyId', 'firstName', 'lastName', 'email', 'phone', 'createdAt', 'updatedAt'],
  }).then((companyReferents) => {
    res.status(200).json(companyReferents);
  }).catch((err) => {
    next(err);
  });
};

const createCompanyReferent = (req, res, next) => {
  CompanyReferent.createCompanyReferent(req.body).then((companyReferent) => {
    res.status(200).json(companyReferent);
  }).catch((err) => {
    next(err);
  });
};

const readCompanyReferent = (req, res, next) => {
  CompanyReferent.readCompanyReferent(req.params.id, {
    attributes: ['id', 'companyId', 'firstName', 'lastName', 'email', 'phone', 'createdAt', 'updatedAt'],
  }).then((companyReferent) => {
    res.status(200).json(companyReferent);
  }).catch((err) => {
    next(err);
  });
};

const updateCompanyReferent = (req, res, next) => {
  CompanyReferent.updateCompanyReferent(req.body, req.user.id).then((companyReferent) => {
    res.status(200).json(companyReferent);
  }).catch((err) => {
    next(err);
  });
};

const deleteCompanyReferent = (req, res, next) => {
  CompanyReferent.deleteCompanyReferent(req.body.id).then((companyReferent) => {
    res.status(200).json(companyReferent);
  }).catch((err) => {
    next(err);
  });
};

module.exports = {
  listCompanyReferent,
  createCompanyReferent,
  readCompanyReferent,
  updateCompanyReferent,
  deleteCompanyReferent,
};
