const Sequelize = require('sequelize');

function skillConstructor(sequelize) {
  return sequelize.define('Skill', {
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
    category: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  }, {
    timestamps: true,
  });
}

module.exports = skillConstructor;
