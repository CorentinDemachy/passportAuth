const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('config');

const tokenData = config.get('tokenData');

const { SiaeReferent } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Functions
const updateSiaeReferent = (siaeReferent, data) => {
  const newSiaeReferent = siaeReferent;
  if (data.password) {
    newSiaeReferent.hash = crypto.pbkdf2Sync(siaeReferent.password, siaeReferent.salt, 1000, 64, 'sha512').toString('hex');
  }
  if (data.firstName) {
    newSiaeReferent.firstName = data.firstName;
  }
  if (data.lastName) {
    newSiaeReferent.lastName = data.lastName;
  }
  if (data.email) {
    newSiaeReferent.email = data.email;
  }
  if (data.phone) {
    newSiaeReferent.phone = data.phone;
  }
  if (data.isArchived) {
    newSiaeReferent.isArchived = data.isArchived;
  }
  return newSiaeReferent;
};

// Static methods
SiaeReferent.listSiaeReferent = options => new Promise(((resolve) => {
  SiaeReferent.sync().then(() => {
    SiaeReferent.findAll(options).then((siaeReferents) => {
      resolve(siaeReferents);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

SiaeReferent.createSiaeReferent = siaeReferent => new Promise(((resolve) => {
  const salt = crypto.randomBytes(16).toString('hex');
  SiaeReferent.sync().then(() => {
    SiaeReferent.create({
      id: idGenerator(),
      siaeId: siaeReferent.siaeId,
      salt,
      hash: crypto.pbkdf2Sync(siaeReferent.password, salt, 1000, 64, 'sha512').toString('hex'),
      firstName: siaeReferent.firstName,
      lastName: siaeReferent.lastName,
      email: siaeReferent.email,
      phone: siaeReferent.phone,
      isArchived: false,
    }).then((siaeReferentCreated) => {
      resolve(siaeReferentCreated);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

SiaeReferent.readSiaeReferent = (siaeReferentId, options) => new Promise(((resolve) => {
  SiaeReferent.sync().then(() => {
    SiaeReferent.findByPk(siaeReferentId, options).then((siaeReferent) => {
      resolve(siaeReferent);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

SiaeReferent.updateSiaeReferent = data => new Promise(((resolve) => {
  SiaeReferent.sync().then(() => {
    SiaeReferent.findByPk(data.id).then((siaeReferent) => {
      siaeReferent.save(
        updateSiaeReferent(siaeReferent, data),
      ).then((updatedSiaeReferent) => {
        resolve(updatedSiaeReferent);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

SiaeReferent.deleteSiaeReferent = siaeReferentId => new Promise(((resolve) => {
  SiaeReferent.sync().then(() => {
    SiaeReferent.findByPk(siaeReferentId).then((siaeReferent) => {
      siaeReferent.destroy().then((deletedSiaeReferent) => {
        if (deletedSiaeReferent && deletedSiaeReferent.deletedAt) {
          resolve(deletedSiaeReferent);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

SiaeReferent.archiveSiaeReferent = siaeReferentId => new Promise(((resolve) => {
  SiaeReferent.sync().then(() => {
    SiaeReferent.findByPk(siaeReferentId).then((siaeReferent) => {
      siaeReferent.save(
        updateSiaeReferent(siaeReferent, { isArchived: !siaeReferent.isArchived }),
      ).then((updatedSiaeReferent) => {
        resolve(updatedSiaeReferent);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

// Methods
SiaeReferent.prototype.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

SiaeReferent.prototype.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + tokenData.tokenExpiryTime);
  return jwt.sign({
    status: 'siaeReferent',
    id: this.id,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, tokenData.tokenSecret);
};

module.exports = SiaeReferent;
