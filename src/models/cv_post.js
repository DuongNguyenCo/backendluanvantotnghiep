"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class cv_post extends Model {
        static associate(models) {}
    }
    cv_post.init(
        {
            id_post: {
                type: DataTypes.INTEGER,
                references: { model: "post", key: "id" },
            },
            id_candidate: {
                type: DataTypes.INTEGER,
                references: { model: "candidate", key: "id" },
            },
            id_cv: {
                type: DataTypes.STRING,
            },
            status: DataTypes.INTEGER,
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "cv_post",
        }
    );
    return cv_post;
};
