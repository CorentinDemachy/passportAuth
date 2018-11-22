const Sequelize = require('sequelize');

function feedbackCoworkerConstructor(sequelize) {
  return sequelize.define('FeedbackCoworker', {
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

module.exports = feedbackCoworkerConstructor;
