const Sequelize = require('sequelize');

function missionCandidateConstructor(sequelize) {
  return sequelize.define('MissionCandidate', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    missionId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    coworkerId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
}

module.exports = missionCandidateConstructor;