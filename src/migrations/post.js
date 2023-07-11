"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("posts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            id_business: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            id_job: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            expire: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            step1: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            step2: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            step3: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            step4: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            step5: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
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
        await queryInterface.dropTable("posts");
    },
};
