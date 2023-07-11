"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("cv_posts", {
            id_post: { allowNull: false, primaryKey: true, type: Sequelize.INTEGER },
            id_candidate: { allowNull: false, primaryKey: true, type: Sequelize.INTEGER },
            id_cv: { allowNull: false, type: Sequelize.STRING },
            status: { type: Sequelize.INTEGER, defaultValue: 0 },
            description: { type: Sequelize.TEXT, allowNull: true },
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
        await queryInterface.dropTable("cv_posts");
    },
};
