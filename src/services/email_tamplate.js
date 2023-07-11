import db from '../models/index';

const getEmailByBusiness = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.email_tamplate.findAll({
                attributes: ['id', 'id_business', 'name', 'content', 'createdAt'],
                where: { id_business: id },
            });
            resolve({ status: 0, mess: 'Find All Successfully', data });
        } catch (e) {
            reject(e);
        }
    });
};

const create = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const a = await db.email_tamplate.findOrCreate({
                where: { name: email.email.label, id_business: email.id },
                defaults: { content: email.email.content },
            });
            if (a[1]) {
                const data = await db.email_tamplate.findAll({
                    attributes: ['id', 'id_business', 'name', 'content', 'createdAt'],
                    where: { id_business: email.id },
                });
                resolve({ status: 0, mess: 'Create Successfully', data });
            } else {
                const b = await db.email_tamplate.update(
                    { content: email.email.content, name: email.email.label },
                    { where: { id: a[0].dataValues.id, id_business: email.id } },
                );
                if (b[0]) {
                    const data1 = await db.email_tamplate.findAll({
                        attributes: ['id', 'id_business', 'name', 'content', 'createdAt'],
                        where: { id_business: email.id },
                    });
                    console.log('data1: ', data1);
                    resolve({ status: 0, mess: 'Update Successfully', data: data1 });
                } else {
                    resolve({ status: -1, mess: 'Update Failed' });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

const deleteEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const dlt = await db.email_tamplate.destroy({
                where: {
                    id: email.id,
                },
            });
            if (dlt) {
                const data = await db.email_tamplate.findAll({
                    attributes: ['id', 'id_business', 'name', 'content', 'createdAt'],
                    where: { id_business: email.idBusiness },
                });
                resolve({ status: 0, mess: 'Delete Successfully', data });
            } else {
                resolve({ status: -1, mess: 'Delete Failed' });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { getEmailByBusiness, create, deleteEmail };
