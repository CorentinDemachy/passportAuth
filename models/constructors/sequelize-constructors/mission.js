const Sequelize = require('sequelize');

function missionConstructor(sequelize) {
  return sequelize.define('Mission', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    coworkerId: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    siaeReferentId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    companyId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    companyReferentId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    startDate: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    endDate: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    totalHours: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    location: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    missionStatus: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
}

module.exports = missionConstructor;
