const { Company, CompanyAdmin } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Functions
const updateCompany = (company, data) => {
  const newCompany = company;
  if (data.name) {
    newCompany.name = data.name;
  }
  return newCompany;
};

// Static methods
Company.listCompany = options => new Promise(((resolve) => {
  Company.sync().then(() => {
    Company.findAll(options).then((companies) => {
      resolve(companies);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Company.createCompany = company => new Promise(((resolve) => {
  Company.sync().then(() => {
    Company.create({
      id: idGenerator(),
      name: company.name,
    }).then((createdCompany) => {
      CompanyAdmin.sync().then(() => {
        CompanyAdmin.createCompanyAdmin({
          id: idGenerator(),
          companyId: createdCompany.id,
          email: company.adminEmail,
          password: createdCompany.name,
        });
      }).then(() => {
        Company.listCompany().then((companies) => {
          resolve(companies);
        }).catch(err => Promise.reject(err));
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Company.readCompany = (companyId, options) => new Promise(((resolve) => {
  Company.sync().then(() => {
    Company.findByPk(companyId, options).then((company) => {
      resolve(company);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Company.updateCompany = data => new Promise(((resolve) => {
  Company.sync().then(() => {
    Company.findByPk(data.id).then((company) => {
      company.save(updateCompany(company, data)).then((updatedCompany) => {
        resolve(updatedCompany);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Company.deleteCompany = companyId => new Promise(((resolve) => {
  Company.sync().then(() => {
    Company.findByPk(companyId).then((company) => {
      company.destroy().then((deletedCompany) => {
        if (deletedCompany && deletedCompany.deletedAt) {
          resolve(deletedCompany);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

module.exports = Company;
