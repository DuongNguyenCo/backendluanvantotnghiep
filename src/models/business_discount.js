"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class business_discount extends Model {
    static associate(models) {}
  }
  business_discount.init(
    {
      id_discount: {
        type: DataTypes.INTEGER,
        references: { model: "service", key: "id" },
      },
      id_business: {
        type: DataTypes.INTEGER,
        references: { model: "business", key: "id" },
      },
      expire: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "business_discount",
    }
  );
  return business_discount;
};
