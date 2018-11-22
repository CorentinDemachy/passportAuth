const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('config');

const tokenData = config.get('tokenData');

const { SiaeAdmin } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Functions
const updateSiaeAdmin = (siaeAdmin, data) => {
  const newSiaeAdmin = siaeAdmin;
  if (data.email) {
    newSiaeAdmin.email = data.email;
  }
  if (data.password) {
    newSiaeAdmin.hash = crypto.pbkdf2Sync(siaeAdmin.password, siaeAdmin.salt, 1000, 64, 'sha512').toString('hex');
  }
  return newSiaeAdmin;
};

// Static methods
SiaeAdmin.listSiaeAdmin = options => new Promise(((resolve) => {
  SiaeAdmin.sync().then(() => {
    SiaeAdmin.findAll(options).then((siaeAdmins) => {
      resolve(siaeAdmins);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

SiaeAdmin.createSiaeAdmin = siaeAdmin => new Promise(((resolve) => {
  const salt = crypto.randomBytes(16).toString('hex');
  SiaeAdmin.sync().then(() => {
    SiaeAdmin.create({
      id: idGenerator(),
      salt,
      hash: crypto.pbkdf2Sync(siaeAdmin.password, salt, 1000, 64, 'sha512').toString('hex'),
      siaeId: siaeAdmin.siaeId,
      email: siaeAdmin.email,
    }).then((createdSiaeAdmin) => {
      resolve(createdSiaeAdmin);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

SiaeAdmin.readSiaeAdmin = (siaeAdminId, options) => new Promise(((resolve) => {
  SiaeAdmin.sync().then(() => {
    SiaeAdmin.findByPk(siaeAdminId, options).then((siaeAdmin) => {
      resolve(siaeAdmin);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

SiaeAdmin.updateSiaeAdmin = data => new Promise(((resolve) => {
  SiaeAdmin.sync().then(() => {
    SiaeAdmin.findByPk(data.id).then((siaeAdmin) => {
      siaeAdmin.save(updateSiaeAdmin(siaeAdmin, data)).then((updatedSiaeAdmin) => {
        resolve(updatedSiaeAdmin);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

SiaeAdmin.deleteSiaeAdmin = siaeAdminId => new Promise(((resolve) => {
  SiaeAdmin.sync().then(() => {
    SiaeAdmin.findByPk(siaeAdminId).then((siaeAdmin) => {
      siaeAdmin.destroy().then((deletedSiaeAdmin) => {
        if (deletedSiaeAdmin && deletedSiaeAdmin.deletedAt) {
          resolve(deletedSiaeAdmin);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

// Methods
SiaeAdmin.prototype.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

SiaeAdmin.prototype.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + tokenData.tokenExpiryTime);
  return jwt.sign({
    status: 'siaeAdmin',
    id: this.id,
    email: this.email,
    siaeId: this.siaeId,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, tokenData.tokenSecret);
};

module.exports = SiaeAdmin;
