'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class receipt_service extends Model {
        static associate(models) {}
    }
    receipt_service.init(
        {
            id_receipt: {
                type: DataTypes.INTEGER,
                references: { model: 'receipt', key: 'id' },
            },
            id_service: {
                type: DataTypes.INTEGER,
                references: { model: 'service', key: 'id' },
            },
        },
        {
            sequelize,
            modelName: 'receipt_service',
        },
    );
    return receipt_service;
};
