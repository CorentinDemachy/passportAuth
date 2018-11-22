const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('config');

const tokenData = config.get('tokenData');

const { CompanyReferent } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Functions
const updateCompanyReferent = (companyReferent, data) => {
  const newCompanyReferent = companyReferent;
  if (data.password) {
    newCompanyReferent.hash = crypto.pbkdf2Sync(companyReferent.password, companyReferent.salt, 1000, 64, 'sha512').toString('hex');
  }
  if (data.firstName) {
    newCompanyReferent.firstName = data.firstName;
  }
  if (data.lastName) {
    newCompanyReferent.lastName = data.lastName;
  }
  if (data.email) {
    newCompanyReferent.email = data.email;
  }
  if (data.phone) {
    newCompanyReferent.phone = data.phone;
  }
  if (data.isArchived) {
    newCompanyReferent.isArchived = data.isArchived;
  }
  return newCompanyReferent;
};

// Static methods
CompanyReferent.listCompanyReferent = options => new Promise(((resolve) => {
  CompanyReferent.sync().then(() => {
    CompanyReferent.findAll(options).then((companyReferents) => {
      resolve(companyReferents);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

CompanyReferent.createCompanyReferent = companyReferent => new Promise(((resolve) => {
  const salt = crypto.randomBytes(16).toString('hex');
  CompanyReferent.sync().then(() => {
    CompanyReferent.create({
      id: idGenerator(),
      companyId: companyReferent.companyId,
      salt,
      hash: crypto.pbkdf2Sync(companyReferent.password, salt, 1000, 64, 'sha512').toString('hex'),
      firstName: companyReferent.firstName,
      lastName: companyReferent.lastName,
      email: companyReferent.email,
      phone: companyReferent.phone,
      isArchived: false,
    }).then((companyReferentCreated) => {
      resolve(companyReferentCreated);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

CompanyReferent.readCompanyReferent = (companyReferentId, options) => new Promise(((resolve) => {
  CompanyReferent.sync().then(() => {
    CompanyReferent.findByPk(companyReferentId, options).then((companyReferent) => {
      resolve(companyReferent);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

CompanyReferent.updateCompanyReferent = data => new Promise(((resolve) => {
  CompanyReferent.sync().then(() => {
    CompanyReferent.findByPk(data.id).then((companyReferent) => {
      companyReferent.save(
        updateCompanyReferent(companyReferent, data),
      ).then((updatedCompanyReferent) => {
        resolve(updatedCompanyReferent);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

CompanyReferent.deleteCompanyReferent = companyReferentId => new Promise(((resolve) => {
  CompanyReferent.sync().then(() => {
    CompanyReferent.findByPk(companyReferentId).then((companyReferent) => {
      companyReferent.destroy().then((deletedCompanyReferent) => {
        if (deletedCompanyReferent && deletedCompanyReferent.deletedAt) {
          resolve(deletedCompanyReferent);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

CompanyReferent.archiveCompanyReferent = companyReferentId => new Promise(((resolve) => {
  CompanyReferent.sync().then(() => {
    CompanyReferent.findByPk(companyReferentId).then((companyReferent) => {
      companyReferent.save(
        updateCompanyReferent(companyReferent, { isArchived: !companyReferent.isArchived }),
      ).then((updatedCompanyReferent) => {
        resolve(updatedCompanyReferent);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

// Methods
CompanyReferent.prototype.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

CompanyReferent.prototype.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + tokenData.tokenExpiryTime);
  return jwt.sign({
    status: 'companyReferent',
    id: this.id,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, tokenData.tokenSecret);
};

module.exports = CompanyReferent;
