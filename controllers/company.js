const { Company, CompanyAdmin } = require('../models/index');

const listCompany = (req, res, next) => {
  Company.listCompany({
    include: [
      {
        model: CompanyAdmin,
        attributes: ['id', 'companyId', 'email', 'createdAt', 'updatedAt'],
      },
    ],
  }).then((companys) => {
    res.status(200).json(companys);
  }).catch(err => next(err));
};

const createCompany = (req, res, next) => {
  Company.createCompany(req.body).then((company) => {
    const companyAdmin = {
      email: `${company.name}@email.com`,
      password: company.name,
      companyId: company.id,
    };
    CompanyAdmin.createCompanyAdmin(companyAdmin).then((companys) => {
      res.status(200).json(companys);
    }).catch((err) => {
      next(err);
    });
  });
};

const readCompany = (req, res, next) => {
  Company.readCompany(req.params.id, {
    include: [
      {
        model: CompanyAdmin,
        attributes: ['id', 'companyId', 'email', 'createdAt', 'updatedAt'],
      },
    ],
  }).then((company) => {
    res.status(200).json(company);
  }).catch(err => next(err));
};

const updateCompany = (req, res, next) => {
  Company.updateCompany(req.body).then((company) => {
    res.status(200).json(company);
  }).catch(err => next(err));
};

const deleteCompany = (req, res, next) => {
  Company.deleteCompany(req.body.id).then((company) => {
    res.status(200).json(company);
  }).catch(err => next(err));
};

module.exports = {
  listCompany,
  createCompany,
  readCompany,
  updateCompany,
  deleteCompany,
};
