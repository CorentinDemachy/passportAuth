const Sequelize = require('sequelize');

function feedbackCompanyConstructor(sequelize) {
  return sequelize.define('FeedbackCompany', {
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

module.exports = feedbackCompanyConstructor;
