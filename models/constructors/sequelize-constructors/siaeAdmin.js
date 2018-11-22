const Sequelize = require('sequelize');

function siaeAdminConstructor(sequelize) {
  return sequelize.define('SiaeAdmin', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    salt: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    hash: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    siaeId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  }, {
    timestamps: true,
  });
}

module.exports = siaeAdminConstructor;
