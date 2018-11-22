const Sequelize = require('sequelize');

function coworkerConstructor(sequelize) {
  return sequelize.define('Coworker', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    siaeReferentId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    siaeId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    salt: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    hash: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    notes: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    phone: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    isValidated: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isArchived: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
}

module.exports = coworkerConstructor;
