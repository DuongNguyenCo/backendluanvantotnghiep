"use strict";
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class receipt extends Model {
        static associate(models) {
            receipt.belongsToMany(models.service, {
                through: models.receipt_service,
                foreignKey: "id_receipt",
            });
            receipt.belongsTo(models.business, { foreignKey: "id_business" });
        }
    }
    receipt.init(
        {
            id_discount: DataTypes.INTEGER,
            id_service: DataTypes.INTEGER,
            id_business: DataTypes.INTEGER,
            name: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
            total: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "receipt",
        }
    );
    return receipt;
};
