const Sequelize = require('sequelize');

function companyAdminConstructor(sequelize) {
  return sequelize.define('CompanyAdmin', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    companyId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
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
  }, {
    timestamps: true,
  });
}

module.exports = companyAdminConstructor;
