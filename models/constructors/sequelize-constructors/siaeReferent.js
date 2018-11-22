const Sequelize = require('sequelize');

function siaeReferentConstructor(sequelize) {
  return sequelize.define('SiaeReferent', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    siaeId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    hash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isArchived: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
}

module.exports = siaeReferentConstructor;
