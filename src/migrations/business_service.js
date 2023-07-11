"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("business_services", {
      id_service: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      id_business: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      expire: {
        type: Sequelize.BIGINT,
        allowNull: false,
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
    await queryInterface.dropTable("business_services");
  },
};
