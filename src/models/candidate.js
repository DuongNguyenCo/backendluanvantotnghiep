"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class candidate extends Model {
        static associate(models) {
            candidate.hasMany(models.cv, { foreignKey: "id_candidate" });
            candidate.hasMany(models.exp, { foreignKey: "id_candidate" });
            candidate.belongsToMany(models.business, {
                through: models.candidate_business,
                foreignKey: "id_candidate",
            });
            candidate.belongsToMany(models.post, {
                through: models.cv_post,
                foreignKey: "id_candidate",
                as: "apply",
            });
            candidate.belongsToMany(models.post, {
                through: models.candidate_post,
                foreignKey: "id_candidate",
                as: "favorites",
            });
        }
    }
    candidate.init(
        {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "candidate",
        }
    );
    return candidate;
};
