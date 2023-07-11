"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("exps", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            id_candidate: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            position: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            workplace_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            day_begin: {
                allowNull: false,
                type: Sequelize.DATEONLY,
            },
            day_end: {
                allowNull: false,
                type: Sequelize.DATEONLY,
            },
            discription: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            exp: {
                allowNull: false,
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("exps");
    },
};
