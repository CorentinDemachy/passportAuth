const Sequelize = require('sequelize');

function missionSkillConstructor(sequelize) {
  return sequelize.define('MissionSkill', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    skillId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    missionId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  }, {
    timestamps: true,
  });
}

module.exports = missionSkillConstructor;
