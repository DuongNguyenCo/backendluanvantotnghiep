"use strict";
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class discount extends Model {
        static associate(models) {
            discount.belongsToMany(models.business, { through: models.business_discount, foreignKey: "id_discount" });
        }
    }
    discount.init(
        {
            name: DataTypes.STRING,
            code: DataTypes.STRING(6),
            expire: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: "discount",
        }
    );
    return discount;
};
