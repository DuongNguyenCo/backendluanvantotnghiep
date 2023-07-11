"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class candidate_business extends Model {
    static associate(models) {}
  }
  candidate_business.init(
    {
      id_candidate: {
        type: DataTypes.INTEGER,
        references: { model: "candidate", key: "id" },
      },
      id_business: {
        type: DataTypes.INTEGER,
        references: { model: "business", key: "id" },
      },
      star: DataTypes.FLOAT,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "candidate_business",
    }
  );
  return candidate_business;
};
