import db from '../models/index';

const getAllByBusiness = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.service.findAll({
                attributes: ['id', 'name', 'type_service'],
                include: [{ model: db.business, attributes: ['id'], where: { id: id } }],
            });
            resolve({ status: 0, mess: 'Find All Successfully', data: data });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { getAllByBusiness };
