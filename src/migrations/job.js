"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("jobs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            id_job_type: { type: Sequelize.INTEGER, allowNull: false },
            name: { type: Sequelize.STRING, allowNull: false },
            salary_min: { type: Sequelize.INTEGER, allowNull: false },
            salary_max: { type: Sequelize.INTEGER, allowNull: false },
            description: { type: Sequelize.TEXT, allowNull: false },
            request: { type: Sequelize.TEXT, allowNull: false },
            quantity: { type: Sequelize.INTEGER, allowNull: false },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });
        await queryInterface.addIndex("jobs", {
            fields: [{ name: "name", length: 255 }],
            type: "FULLTEXT",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("jobs");
    },
};
