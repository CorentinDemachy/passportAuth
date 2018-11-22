const Sequelize = require('sequelize');

function feedbackJumperConstructor(sequelize) {
  return sequelize.define('FeedbackJumper', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    missionId: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    content: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  }, {
    timestamps: true,
  });
}

module.exports = feedbackJumperConstructor;
