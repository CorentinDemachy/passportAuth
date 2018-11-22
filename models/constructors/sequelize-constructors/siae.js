const Sequelize = require('sequelize');

function siaeConstructor(sequelize) {
  return sequelize.define('Siae', {
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

module.exports = siaeConstructor;
