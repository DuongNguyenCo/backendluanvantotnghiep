import { Op } from 'sequelize';
import db from '../models/index';
import { checkPassword, accessToken, refreshToken, hashPassword } from './function';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

let uploadCloud = (image, fname) => {
    return new Promise(async (resolve, reject) => {
        try {
            await cloudinary.uploader.upload(
                image,
                {
                    overwrite: true,
                    invalidate: true,
                    resource_type: 'raw',
                    public_id: `logo/business/${fname}`,
                },
                (err, result) => {
                    if (err) console.log(err);
                    if (result) {
                        resolve(result);
                    }
                },
            );
        } catch (e) {
            reject(e);
        }
    });
};

const update = (business) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resUpload = await uploadCloud(business.img, business.name);
            const update = await db.business.update(
                {
                    name: business.name,
                    phone: business.phone,
                    img: resUpload.url,
                    description: business.description,
                    benefit: business.benefit,
                },
                { where: { email: business.email } },
            );
            if (update[0]) {
                const data = await db.business.findOne({
                    attributes: ['id', 'name', 'phone', 'email', 'img', 'description', 'benefit'],
                    where: { id: business.id },
                });
                resolve({ status: 0, mess: 'Update Successfully', data });
            } else {
                resolve({ status: 1, mess: 'Update Failed' });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.business.findAll({
                attributes: ['id', 'name', 'img', 'description'],
                include: [
                    { model: db.address, attributes: ['id', 'city'] },
                    { model: db.candidate, attributes: ['id'] },
                ],
                where: { img: { [Op.not]: null } },
            });
            const data1 = await Promise.all(
                data.map(async (e) => {
                    return await db.post.findAll({
                        attributes: ['id', 'status'],
                        include: [{ model: db.business, attributes: ['id'], where: { id: e.id } }],
                        where: { status: 1 },
                    });
                }),
            );
            resolve({ status: 0, mess: 'Find All Successfully', data: { data, data1 } });
        } catch (e) {
            reject(e);
        }
    });
};

const getBusinessById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.business.findOne({
                attributes: ['id', 'name', 'phone', 'email', 'img', 'description', 'benefit'],
                where: { id: id },
            });
            resolve({ status: 0, mess: 'Find All Successfully', data });
        } catch (e) {
            reject(e);
        }
    });
};

const getById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.business.findOne({
                attributes: ['id', 'name', 'img', 'description'],
                include: [
                    { model: db.address, attributes: ['id', 'city'] },
                    { model: db.candidate, attributes: ['id'] },
                ],
                where: { name: id },
            });
            const data1 = await db.post.findAll({
                attributes: ['id', 'createdAt', 'status', 'expire'],
                include: [
                    {
                        model: db.job,
                        attributes: ['name', 'salary_min', 'salary_max'],
                        include: [
                            {
                                model: db.language,
                                attributes: ['id', 'name'],
                            },
                            {
                                model: db.address,
                                attributes: ['id', 'city'],
                            },
                        ],
                    },
                    {
                        model: db.business,
                        attributes: ['id'],
                        where: { id: data.dataValues.id },
                    },
                ],
                where: { [Op.and]: { expire: { [Op.gte]: new Date() }, status: 1 } },
            });

            resolve({ status: 0, mess: 'Find All Successfully', data: { data, data1 } });
        } catch (e) {
            reject(e);
        }
    });
};

const signIn = (business) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.business.findOne({
                where: { email: business.email },
                raw: true,
            });
            if (data) {
                const checkPass = checkPassword(business.password, data.password);
                if (checkPass) {
                    const { id, email, password, ...other } = data;
                    const tokenAccess = accessToken({ id, email });
                    const tokenRefresh = refreshToken({ id, email });
                    resolve({
                        isBusiness: 1,
                        status: 0,
                        mess: 'Successful Search',
                        data: { ...other, id, email },
                        tokenAccess,
                        tokenRefresh,
                    });
                } else {
                    resolve({
                        status: 1,
                        mess: 'Incorrect information',
                    });
                }
            }
            resolve({
                status: -1,
                mess: "Business doesn't exist",
            });
        } catch (e) {
            reject(e);
        }
    });
};

const signUp = (business) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.business.findOrCreate({
                where: { email: business.email, name: business.name },
                defaults: { phone: business.phone, password: await hashPassword(business.password) },
            });
            if (data[1]) {
                const a = business.street.split(' ');
                const b = a.map((e) => {
                    return e.replace(e.charAt(0), e.charAt(0).toUpperCase());
                });
                await db.address.create({
                    id_business: data[0].dataValues.id,
                    city: business.city,
                    district: business.district,
                    ward: business.ward,
                    street: b.join(' '),
                });
                const { password, ...other } = data[0].dataValues;
                const tokenAccess = accessToken({ id: data[0].dataValues.id, email: data[0].dataValues.email });
                const tokenRefresh = refreshToken({ id: data[0].dataValues.id, email: data[0].dataValues.email });
                resolve({
                    isBusiness: 1,
                    status: 0,
                    mess: 'Register Successfully',
                    data: other,
                    tokenAccess,
                    tokenRefresh,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = { getAll, getById, signIn, signUp, getBusinessById, update };
