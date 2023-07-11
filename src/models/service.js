"use strict";
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class service extends Model {
        static associate(models) {
            service.belongsToMany(models.business, {
                through: models.business_service,
                foreignKey: "id_service",
            });
            service.belongsToMany(models.post, {
                through: models.post_service,
                foreignKey: "id_service",
            });
            service.belongsToMany(models.receipt, {
                through: models.receipt_service,
                foreignKey: "id_service",
            });
        }
    }
    service.init(
        {
            name: DataTypes.STRING,
            type_service: DataTypes.INTEGER,
            price: DataTypes.INTEGER,
            new_post: DataTypes.BOOLEAN,
            hot_post: DataTypes.BOOLEAN,
            count_post: DataTypes.INTEGER,
            expire: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: "service",
        }
    );
    return service;
};
