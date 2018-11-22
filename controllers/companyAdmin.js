const { CompanyAdmin } = require('../models/index');


const listCompanyAdmin = (req, res, next) => {
  CompanyAdmin.listCompanyAdmin({
    attributes: ['id', 'companyId', 'email', 'createdAt', 'updatedAt'],
  }).then((companyAdmins) => {
    res.status(200).json(companyAdmins);
  }).catch((err) => {
    next(err);
  });
};

const createCompanyAdmin = (req, res, next) => {
  CompanyAdmin.createCompanyAdmin(req.body).then((companyAdmin) => {
    res.status(200).json(companyAdmin);
  }).catch((err) => {
    next(err);
  });
};

const readCompanyAdmin = (req, res, next) => {
  CompanyAdmin.readCompanyAdmin(req.params.id, {
    attributes: ['id', 'companyId', 'email', 'createdAt', 'updatedAt'],
  }).then((companyAdmin) => {
    res.status(200).json(companyAdmin);
  }).catch((err) => {
    next(err);
  });
};

const updateCompanyAdmin = (req, res, next) => {
  CompanyAdmin.updateCompanyAdmin(req.body).then((companyAdmin) => {
    res.status(200).json(companyAdmin);
  }).catch((err) => {
    next(err);
  });
};

const deleteCompanyAdmin = (req, res, next) => {
  CompanyAdmin.deleteCompanyAdmin(req.body.id).then((companyAdmin) => {
    res.status(200).json(companyAdmin);
  }).catch((err) => {
    next(err);
  });
};

module.exports = {
  listCompanyAdmin,
  createCompanyAdmin,
  readCompanyAdmin,
  updateCompanyAdmin,
  deleteCompanyAdmin,
};
