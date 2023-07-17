import { where } from 'sequelize';
import db from '../models/index';
import { hashPassword, checkPassword, refreshToken, accessToken, sendEmail, randomPassword } from './function';
let login = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.candidate.findOne({
                where: { email: payload.email },
                attributes: ['id', 'email', 'first_name', 'last_name', 'password'],
                raw: true,
            });
            if (data) {
                const result = checkPassword(payload.password, data.password);
                if (result) {
                    const { password, id, email, ...other } = data;
                    const tokenAccess = accessToken({ id, email });
                    const tokenRefresh = refreshToken({ id, email });
                    resolve({
                        isBusiness: 0,
                        status: 0,
                        mess: 'Successful Search',
                        data: { ...other, id, email },
                        tokenAccess,
                        tokenRefresh,
                    });
                } else resolve({ status: 1, mess: 'Incorrect information' });
            } else {
                resolve({ status: -1, mess: 'Not Found' });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let register = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.candidate.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    password: await hashPassword(payload.password),
                },
            });
            if (data[1]) {
                const { password, ...other } = data[0].dataValues;
                resolve({
                    isBusiness: 0,
                    status: 0,
                    mess: 'Successful Search',
                    data: { ...other },
                    tokenAccess,
                    tokenRefresh,
                });
            } else {
                resolve({ status: -1, mess: 'User Already Exists' });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.candidate.findOne({
                attributes: ['id', 'first_name', 'last_name', 'email'],
                where: { id: id },
            });
            resolve({ status: 0, mess: 'Find Successfully', data });
        } catch (e) {
            reject(e);
        }
    });
};

const forgotPassword = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.candidate.findOne({
                attributes: ['id', 'first_name', 'last_name', 'email'],
                where: { email: email.email },
                raw: true,
            });
            if (data) {
                const newPassword = randomPassword(10);
                const hashPass = await hashPassword(newPassword);
                await db.candidate.update(
                    {
                        password: hashPass,
                    },
                    { where: { email: email.email } },
                );
                sendEmail(
                    'cloudbackenddncjob@gmail.com',
                    data.email,
                    `<p>Xin chào ${data.first_name + ' ' + data.last_name}</p>
                    <p>Theo yêu cầu của bạn, DNCJOB gửi lại bạn thông tin mật mã tài khoản DNCJOB</p>
                    <p>Password: <b>${newPassword}</b></p>
                    <p>Cám ơn bạn và chúc bạn một ngày tốt lành.</p>
                    <p>DNCJOB!</p>`,
                );
                resolve({ status: 0, mess: 'Find Successfully' });
            } else {
                resolve({ status: -1, mess: 'Not Found' });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const resetPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPass = await hashPassword(password.password);
            const data = await db.candidate.update(
                {
                    password: hashPass,
                },
                { where: { id: password.id } },
            );
        } catch (e) {
            reject(e);
        }
    });
};

const getJobApply = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.candidate.findAll({
                attributes: ['id'],
                where: { id: id },
                include: [
                    {
                        model: db.post,
                        as: 'apply',
                        attributes: ['id', 'createdAt'],
                        include: [
                            {
                                model: db.job,
                                attributes: ['id', 'name', 'salary_min', 'salary_max'],
                                include: [
                                    { model: db.language, attributes: ['id', 'name'] },
                                    { model: db.address, attributes: ['id', 'district'] },
                                ],
                            },
                            {
                                model: db.business,
                                attributes: ['id', 'img'],
                            },
                        ],
                    },
                ],
            });
            resolve({ status: 0, mess: 'Find Successfully', data });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { login, register, getById, forgotPassword, resetPassword, getJobApply };
