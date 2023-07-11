"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class candidate_post extends Model {
    static associate(models) {}
  }
  candidate_post.init(
    {
      id_candidate: {
        type: DataTypes.INTEGER,
        references: { model: "candidate", key: "id" },
      },
      id_post: {
        type: DataTypes.INTEGER,
        references: { model: "post", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "candidate_post",
    }
  );
  return candidate_post;
};
