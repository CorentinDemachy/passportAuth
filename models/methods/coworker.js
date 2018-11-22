const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('config');

const tokenData = config.get('tokenData');

const { Coworker } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Functions
const updateCoworker = (coworker, data) => {
  const newCoworker = coworker;
  if (data.siaeId) {
    newCoworker.siaeId = data.siaeId;
  }
  if (data.siaeReferentId) {
    newCoworker.siaeReferentId = data.siaeReferentId;
  }
  if (data.password) {
    newCoworker.hash = crypto.pbkdf2Sync(coworker.password, coworker.salt, 1000, 64, 'sha512').toString('hex');
  }
  if (data.firstName) {
    newCoworker.firstName = data.firstName;
  }
  if (data.lastName) {
    newCoworker.lastName = data.lastName;
  }
  if (data.notes) {
    newCoworker.notes = data.notes;
  }
  if (data.email) {
    newCoworker.email = data.email;
  }
  if (data.phone) {
    newCoworker.phone = data.phone;
  }
  if (data.isValidated) {
    newCoworker.isValidated = data.isValidated;
  }
  if (data.isArchived) {
    newCoworker.isArchived = data.isArchived;
  }
  return newCoworker;
};

// Static methods
Coworker.listCoworker = options => new Promise(((resolve) => {
  Coworker.sync().then(() => {
    Coworker.findAll(options).then((coworkers) => {
      resolve(coworkers);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Coworker.createCoworker = coworker => new Promise(((resolve) => {
  const salt = crypto.randomBytes(16).toString('hex');
  Coworker.sync().then(() => {
    Coworker.create({
      id: idGenerator(),
      siaeReferentId: coworker.siaeReferentId,
      siaeId: coworker.siaeId,
      salt,
      hash: crypto.pbkdf2Sync(coworker.password, salt, 1000, 64, 'sha512').toString('hex'),
      firstName: coworker.firstName,
      lastName: coworker.lastName,
      notes: coworker.notes,
      email: coworker.email,
      phone: coworker.phone,
      isValidated: false,
      isArchived: false,
    }).then((coworkerCreated) => {
      resolve(coworkerCreated);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Coworker.readCoworker = (coworkerId, options) => new Promise(((resolve) => {
  Coworker.sync().then(() => {
    Coworker.findByPk(coworkerId, options).then((coworker) => {
      resolve(coworker);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Coworker.updateCoworker = data => new Promise(((resolve) => {
  Coworker.sync().then(() => {
    Coworker.findByPk(data.id).then((coworker) => {
      coworker.save(
        updateCoworker(coworker, data),
      ).then((updatedCoworker) => {
        resolve(updatedCoworker);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Coworker.deleteCoworker = coworkerId => new Promise(((resolve) => {
  Coworker.sync().then(() => {
    Coworker.findByPk(coworkerId).then((coworker) => {
      coworker.destroy().then((deletedCoworker) => {
        if (deletedCoworker && deletedCoworker.deletedAt) {
          resolve(deletedCoworker);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Coworker.archiveCoworker = coworkerId => new Promise(((resolve) => {
  Coworker.sync().then(() => {
    Coworker.findByPk(coworkerId).then((coworker) => {
      coworker.save(
        updateCoworker(coworker, { isArchived: !coworker.isArchived }),
      ).then((updatedCoworker) => {
        resolve(updatedCoworker);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

// Methods
Coworker.prototype.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

Coworker.prototype.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + tokenData.tokenExpiryTime);
  return jwt.sign({
    status: 'coworker',
    id: this.id,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, tokenData.tokenSecret);
};

module.exports = Coworker;
