const Sequelize = require('sequelize');

function companyConstructor(sequelize) {
  return sequelize.define('Company', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
  }, {
    timestamps: true,
  });
}

module.exports = companyConstructor;
