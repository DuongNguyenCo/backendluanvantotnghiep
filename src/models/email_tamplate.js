"use strict";
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class email_tamplate extends Model {
        static associate(models) {
            email_tamplate.belongsTo(models.business, {
                foreignKey: "id_business",
            });
        }
    }
    email_tamplate.init(
        {
            id_business: DataTypes.INTEGER,
            name: DataTypes.STRING,
            content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "email_tamplate",
        }
    );
    return email_tamplate;
};
