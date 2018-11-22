const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('config');

const tokenData = config.get('tokenData');
const { Jumper } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');


// Functions
const updateJumper = (jumper, data) => {
  const newJumper = jumper;
  if (data.password) {
    newJumper.hash = crypto.pbkdf2Sync(jumper.password, jumper.salt, 1000, 64, 'sha512').toString('hex');
  }
  if (data.firstName) {
    newJumper.firstName = data.firstName;
  }
  if (data.lastName) {
    newJumper.lastName = data.lastName;
  }
  if (data.email) {
    newJumper.email = data.email;
  }
  if (data.phone) {
    newJumper.phone = data.phone;
  }
  if (data.isSuperAdmin) {
    newJumper.isSuperAdmin = data.isSuperAdmin;
  }
  return newJumper;
};

// Static methods
Jumper.listJumper = options => new Promise(((resolve) => {
  Jumper.sync().then(() => {
    Jumper.findAll(options).then((jumpers) => {
      resolve(jumpers);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Jumper.createJumper = jumper => new Promise(((resolve) => {
  const salt = crypto.randomBytes(16).toString('hex');
  Jumper.sync().then(() => {
    Jumper.create({
      id: idGenerator(),
      salt,
      hash: crypto.pbkdf2Sync(jumper.password, salt, 1000, 64, 'sha512').toString('hex'),
      firstName: jumper.firstName,
      lastName: jumper.lastName,
      email: jumper.email,
      phone: jumper.phone,
      isSuperAdmin: jumper.isSuperAdmin,
    }).then((jumperCreated) => {
      resolve(jumperCreated);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Jumper.readJumper = (jumperId, options) => new Promise(((resolve) => {
  Jumper.sync().then(() => {
    Jumper.findByPk(jumperId, options).then((jumper) => {
      resolve(jumper);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Jumper.updateJumper = data => new Promise(((resolve) => {
  Jumper.sync().then(() => {
    Jumper.findByPk(data.id).then((jumper) => {
      jumper.save(updateJumper(jumper, data)).then((updatedJumper) => {
        resolve(updatedJumper);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Jumper.deleteJumper = jumperId => new Promise(((resolve) => {
  Jumper.sync().then(() => {
    Jumper.findByPk(jumperId).then((jumper) => {
      jumper.destroy().then((deletedJumper) => {
        if (deletedJumper && deletedJumper.deletedAt) {
          resolve(deletedJumper);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

// Methods
Jumper.prototype.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

Jumper.prototype.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + tokenData.tokenExpiryTime);
  return jwt.sign({
    status: 'jumper',
    id: this.id,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, tokenData.tokenSecret);
};

module.exports = Jumper;
