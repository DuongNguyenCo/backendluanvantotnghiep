"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class exp extends Model {
        static associate(models) {
            exp.belongsTo(models.candidate, { foreignKey: "id_candidate" });
        }
    }
    exp.init(
        {
            id_candidate: DataTypes.INTEGER,
            position: DataTypes.INTEGER,
            workplace_name: DataTypes.STRING,
            day_begin: DataTypes.DATEONLY,
            day_end: DataTypes.DATEONLY,
            discription: DataTypes.TEXT,
            exp: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "exp",
        }
    );
    return exp;
};
