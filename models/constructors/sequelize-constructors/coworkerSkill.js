const Sequelize = require('sequelize');

function coworkerSkillConstructor(sequelize) {
  return sequelize.define('CoworkerSkill', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    level: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    skillId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    coworkerId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  }, {
    timestamps: true,
  });
}

module.exports = coworkerSkillConstructor;
