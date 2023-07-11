"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("receipt_services", {
            id_receipt: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            id_service: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("receipt_services");
    },
};
