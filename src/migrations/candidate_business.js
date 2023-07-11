"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("candidate_businesses", {
      id_candidate: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_business: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      star: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("candidate_businesses");
  },
};
