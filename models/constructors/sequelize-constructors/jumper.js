const Sequelize = require('sequelize');

function jumperConstructor(sequelize) {
  return sequelize.define('Jumper', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
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
    isSuperAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
}

module.exports = jumperConstructor;
