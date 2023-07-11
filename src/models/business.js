"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class business extends Model {
        static associate(models) {
            business.hasMany(models.address, { foreignKey: "id_business" });
            business.hasMany(models.email_tamplate, { foreignKey: "id_business" });
            business.hasMany(models.post, { foreignKey: "id_business" });
            business.hasMany(models.receipt, { foreignKey: "id_business" });
            business.belongsToMany(models.service, { through: models.business_service, foreignKey: "id_business" });
            business.belongsToMany(models.candidate, { through: models.candidate_business, foreignKey: "id_business" });
            business.belongsToMany(models.discount, { through: models.business_discount, foreignKey: "id_business" });
        }
    }
    business.init(
        {
            name: DataTypes.STRING,
            phone: DataTypes.STRING(10),
            email: DataTypes.STRING,
            description: DataTypes.TEXT,
            benefit: DataTypes.TEXT,
            img: DataTypes.TEXT,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "business",
        }
    );
    return business;
};
