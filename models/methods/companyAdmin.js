const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('config');

const tokenData = config.get('tokenData');

const { CompanyAdmin } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Functions
const updateCompanyAdmin = (companyAdmin, data) => {
  const newCompanyAdmin = companyAdmin;
  if (data.email) {
    newCompanyAdmin.email = data.email;
  }
  if (data.password) {
    newCompanyAdmin.hash = crypto.pbkdf2Sync(companyAdmin.password, companyAdmin.salt, 1000, 64, 'sha512').toString('hex');
  }
  return newCompanyAdmin;
};

// Static methods
CompanyAdmin.listCompanyAdmin = options => new Promise(((resolve) => {
  CompanyAdmin.sync().then(() => {
    CompanyAdmin.findAll(options).then((companyAdmins) => {
      resolve(companyAdmins);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

CompanyAdmin.createCompanyAdmin = companyAdmin => new Promise(((resolve) => {
  const salt = crypto.randomBytes(16).toString('hex');
  CompanyAdmin.sync().then(() => {
    CompanyAdmin.create({
      id: idGenerator(),
      salt,
      hash: crypto.pbkdf2Sync(companyAdmin.password, salt, 1000, 64, 'sha512').toString('hex'),
      companyId: companyAdmin.companyId,
      email: companyAdmin.email,
    }).then((createdCompanyAdmin) => {
      resolve(createdCompanyAdmin);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

CompanyAdmin.readCompanyAdmin = (companyAdminId, options) => new Promise(((resolve) => {
  CompanyAdmin.sync().then(() => {
    CompanyAdmin.findByPk(companyAdminId, options).then((companyAdminFetched) => {
      resolve(companyAdminFetched);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

CompanyAdmin.updateCompanyAdmin = data => new Promise(((resolve) => {
  CompanyAdmin.sync().then(() => {
    CompanyAdmin.findByPk(data.id).then((companyAdmin) => {
      companyAdmin.save(updateCompanyAdmin(companyAdmin, data)).then((updatedCompanyAdmin) => {
        resolve(updatedCompanyAdmin);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

CompanyAdmin.deleteCompanyAdmin = companyAdminId => new Promise(((resolve) => {
  CompanyAdmin.sync().then(() => {
    CompanyAdmin.findByPk(companyAdminId).then((companyAdmin) => {
      companyAdmin.destroy().then((deletedCompanyAdmin) => {
        if (deletedCompanyAdmin && deletedCompanyAdmin.deletedAt) {
          resolve(deletedCompanyAdmin);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

// Methods
CompanyAdmin.prototype.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

CompanyAdmin.prototype.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + tokenData.tokenExpiryTime);
  return jwt.sign({
    status: 'companyAdmin',
    id: this.id,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, tokenData.tokenSecret);
};

module.exports = CompanyAdmin;
