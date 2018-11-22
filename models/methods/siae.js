const { Siae, SiaeAdmin } = require('../constructors/index');
const idGenerator = require('../../utils/idGenerator');

// Functions
const updateSiae = (siae, data) => {
  const newSiae = siae;
  if (data.name) {
    newSiae.name = data.name;
  }
  return newSiae;
};

// Static methods
Siae.listSiae = options => new Promise(((resolve) => {
  Siae.sync().then(() => {
    Siae.findAll(options).then((siaes) => {
      resolve(siaes);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Siae.createSiae = siae => new Promise(((resolve) => {
  Siae.sync().then(() => {
    Siae.create({
      id: idGenerator(),
      name: siae.name,
    }).then((createdSiae) => {
      SiaeAdmin.sync().then(() => {
        SiaeAdmin.createSiaeAdmin({
          id: idGenerator(),
          siaeId: createdSiae.id,
          email: siae.adminEmail,
          password: createdSiae.name,
        });
      }).then(() => {
        Siae.listSiae().then((companies) => {
          resolve(companies);
        }).catch(err => Promise.reject(err));
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Siae.readSiae = (siaeId, options) => new Promise(((resolve) => {
  Siae.sync().then(() => {
    Siae.findByPk(siaeId, options).then((siae) => {
      resolve(siae);
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Siae.updateSiae = data => new Promise(((resolve) => {
  Siae.sync().then(() => {
    Siae.findByPk(data.id).then((siae) => {
      siae.save(updateSiae(siae, data)).then((updatedSiae) => {
        resolve(updatedSiae);
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

Siae.deleteSiae = siaeId => new Promise(((resolve) => {
  Siae.sync().then(() => {
    Siae.findByPk(siaeId).then((siae) => {
      siae.destroy().then((deletedSiae) => {
        if (deletedSiae && deletedSiae.deletedAt) {
          resolve(deletedSiae);
        }
      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err));
  }).catch(err => Promise.reject(err));
}));

module.exports = Siae;
