"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Teams" },
        onDelete: "CASCADE",
      },

      description: {
        type: Sequelize.STRING(5000),
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      priority: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      accepted_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      budget: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      misc: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Projects");
  },
};
