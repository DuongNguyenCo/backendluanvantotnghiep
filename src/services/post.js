import { Op, Sequelize } from 'sequelize';
import db from '../models/index';

let getAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.post.findAll({
                attributes: ['id', 'createdAt', 'status', 'expire'],
                include: [
                    { model: db.business, attributes: ['id', 'name', 'img'] },
                    {
                        model: db.job,
                        attributes: ['id', 'name', 'salary_min', 'salary_max'],
                        include: [
                            { model: db.language, attributes: ['id', 'name'] },
                            { model: db.address, attributes: ['id', 'district'] },
                        ],
                    },
                    { model: db.service, attributes: ['id', 'new_post', 'hot_post'] },
                ],
                where: [{ [Op.and]: { expire: { [Op.gte]: new Date() }, status: 1 } }],
            });
            resolve({
                status: 0,
                mess: 'Find All Successfully',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.post.findOne({
                attributes: ['id', 'createdAt'],
                include: [
                    {
                        model: db.business,
                        attributes: ['id', 'name', 'img', 'description', 'benefit'],
                    },
                    {
                        model: db.job,
                        attributes: ['id', 'name', 'salary_min', 'salary_max', 'description', 'request'],
                        include: [
                            { model: db.language, attributes: ['id', 'name'] },
                            {
                                model: db.address,
                                attributes: ['id', 'street', 'ward', 'district', 'city'],
                            },
                        ],
                        where: { name: id },
                    },
                ],
            });
            resolve({
                status: 0,
                mess: 'Find All Successfully',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getRelate = (language) => {
    return new Promise(async (resolve, reject) => {
        try {
            const c = language.split(',');
            const data1 = await db.job.findAll({
                attributes: ['id'],
                include: [
                    {
                        model: db.language,
                        attributes: ['id'],
                        where: { id: { [Op.in]: c } },
                    },
                ],
                limit: 5,
                nest: true,
            });
            const a = data1?.map((e) => {
                return e.id;
            });
            const data = await db.post.findAll({
                attributes: ['id', 'createdAt'],
                include: [
                    { model: db.business, attributes: ['id', 'name', 'img'] },
                    {
                        model: db.job,
                        attributes: ['id', 'name'],
                        include: [
                            {
                                model: db.language,
                                attributes: ['id', 'name'],
                            },
                        ],
                        where: { id: a },
                    },
                ],
                nest: true,
            });
            resolve({
                status: 0,
                mess: 'Find All Successfully',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllByIdBusiness = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.post.findAll({
                attributes: ['id', 'expire', 'status', 'expire'],
                include: [
                    { model: db.business, attributes: ['id', 'email'], where: { id: id } },
                    {
                        model: db.job,
                        attributes: ['id', 'name'],
                        include: [
                            { model: db.language, attributes: ['id', 'name'] },
                            { model: db.address, attributes: ['id', 'district'] },
                        ],
                    },
                    { model: db.service, attributes: ['id', 'name'] },
                    { model: db.candidate, attributes: ['id'], as: 'apply' },
                ],
                where: { [Op.and]: { expire: { [Op.gte]: new Date() }, status: 1 } },
            });
            resolve({
                status: 0,
                mess: 'Find All Successfully',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllExpireByIdBusiness = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.post.findAll({
                attributes: ['id', 'expire'],
                include: [
                    { model: db.business, attributes: ['id', 'email'], where: { id: id } },
                    {
                        model: db.job,
                        attributes: ['id', 'name'],
                        include: [
                            { model: db.language, attributes: ['id', 'name'] },
                            { model: db.address, attributes: ['id', 'district'] },
                        ],
                    },
                    { model: db.service, attributes: ['id', 'name'] },
                    { model: db.candidate, attributes: ['id'], as: 'apply' },
                ],
                where: { expire: { [Op.lte]: new Date() } },
            });
            resolve({
                status: 0,
                mess: 'Find All Successfully',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};
//cbi bo
const getAllSevenDayByIdBusiness = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const date = new Date();
            console.log('date: ', date);
            let seven = new Date();

            seven = date.getTime() + 604800000;
            console.log('seven: ', seven);
            const data = await db.post.findAll({
                attributes: ['id', 'expire'],
                include: [
                    { model: db.business, attributes: ['id', 'email'], where: { id: id } },
                    {
                        model: db.job,
                        attributes: ['id', 'name'],
                        include: [
                            { model: db.language, attributes: ['id', 'name'] },
                            { model: db.address, attributes: ['id', 'district'] },
                        ],
                    },
                    { model: db.service, attributes: ['id', 'name'] },
                    { model: db.candidate, attributes: ['id'], as: 'apply' },
                ],
                where: { expire: { [Op.lte]: 604800000 } },
            });
            Math.floor((dateExpire.getTime() - dateNow.getTime()) / (1000 * 60 * 60 * 24));
            resolve({
                status: 0,
                mess: 'Find All Successfully',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllHiddenByIdBusiness = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.post.findAll({
                attributes: ['id', 'expire', 'status'],
                include: [
                    { model: db.business, attributes: ['id', 'email'], where: { id: id } },
                    {
                        model: db.job,
                        attributes: ['id', 'name'],
                        include: [
                            { model: db.language, attributes: ['id', 'name'] },
                            { model: db.address, attributes: ['id', 'district'] },
                        ],
                    },
                    { model: db.service, attributes: ['id', 'name'] },
                    { model: db.candidate, attributes: ['id'], as: 'apply' },
                ],
                where: { status: 0, expire: { [Op.gte]: new Date() } },
            });
            resolve({
                status: 0,
                mess: 'Find All Successfully',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllByIdPost = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.post.findOne({
                attributes: ['id'],
                include: [
                    {
                        model: db.candidate,
                        attributes: ['id', 'first_name', 'last_name'],
                        as: 'apply',
                    },
                ],
                where: { id: id },
            });
            if (data) {
                const data1 = await Promise.all(
                    data?.dataValues.apply.map(async (e) => {
                        return await await db.cv.findOne({
                            attributes: ['id', 'file'],
                            where: { id: e.cv_post.id_cv },
                        });
                    }),
                );

                resolve({
                    status: 0,
                    mess: 'Find All Successfully',
                    data: { data, data1 },
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllPostByID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.post.findAll({
                attributes: ['id', 'createdAt'],
                include: [
                    { model: db.job, attributes: ['id', 'name'] },
                    { model: db.business, attributes: ['id'], where: { id: id } },
                ],
            });
            resolve({
                status: 0,
                mess: 'Find All Successfully',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateStep = (post) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { step1, step2, step3, step4, step5 } = post.step;
            const data = await db.post.update(
                {
                    step1: step1,
                    step2: step2,
                    step3: step3,
                    step4: step4,
                    step5: step5,
                },
                { where: { id: post.id_post } },
            );
            resolve({
                status: 0,
                mess: 'Update Successfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateService = (post) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { defaultService, optionService } = post.service;
            await db.post_service.create({
                id_service: defaultService,
                id_post: post.id_post,
            });
            if (optionService !== 0) {
                await db.post_service.create({
                    id_service: optionService,
                    id_post: post.id_post,
                });
            }
            const data = await db.business.findOne({
                attributes: ['id', 'name'],
                include: [
                    {
                        model: db.service,
                        attributes: ['id', 'type_service', 'count_post'],
                        where: { id: defaultService },
                    },
                    { model: db.post, attribute: ['id', 'status'], required: false, where: { status: 1 } },
                ],
                where: { id: post.id_business },
            });
            if (data?.dataValues.posts.length < data?.dataValues.services[0].count_post) {
                await db.post.update(
                    {
                        status: 1,
                    },
                    { where: { id: post.id_post } },
                );
                resolve({
                    status: 0,
                    mess: 'Update Successfully',
                });
            } else {
                resolve({
                    status: -1,
                    mess: 'The Maximum Number of Posts Has Been Reached',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateState = (post) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.post.findOne({
                attributes: ['id', 'status'],
                where: { id: post.id_post },
                raw: true,
                nest: true,
            });
            if (data) {
                if (data.status) {
                    await db.post.update(
                        { status: 0 },
                        {
                            where: {
                                id: data.id,
                            },
                        },
                    );
                } else {
                    await db.post.update(
                        { status: 0 },
                        {
                            where: {
                                id: data.id,
                            },
                        },
                    );
                }
                const data1 = await db.post.findAll({
                    attributes: ['id', 'expire', 'status', 'expire'],
                    include: [
                        { model: db.business, attributes: ['id', 'email'], where: { id: post.id_business } },
                        {
                            model: db.job,
                            attributes: ['id', 'name'],
                            include: [
                                { model: db.language, attributes: ['id', 'name'] },
                                { model: db.address, attributes: ['id', 'district'] },
                            ],
                        },
                        { model: db.service, attributes: ['id', 'name'] },
                        { model: db.candidate, attributes: ['id'], as: 'apply' },
                    ],
                    where: { [Op.and]: { expire: { [Op.gte]: new Date() }, status: 1 } },
                });
                resolve({
                    status: 0,
                    mess: 'Update Successfully',
                    data: data1,
                });
            }
            resolve({
                status: -1,
                mess: 'Post Not Found',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deletePost = (post) => {
    return new Promise(async (resolve, reject) => {
        try {
            const a = await db.post.findOne({
                attributes: ['id_job'],
                where: {
                    id: post.id_post,
                },
            });
            const data = await db.post.destroy({ where: { id: post.id_post } });

            if (data === 1) {
                Promise.all([
                    await db.job_language.destroy({ where: { id_job: a.dataValues.id_job }, force: true }),
                    await db.job_address.destroy({ where: { id_job: a.dataValues.id_job }, force: true }),
                    await db.job.destroy({ where: { id: a.dataValues.id_job }, force: true }),
                ]);

                // const data1 = await db.post.findAll({
                //     attributes: ['id', 'expire', 'status', 'expire'],
                //     include: [
                //         { model: db.business, attributes: ['id', 'email'], where: { id: post.id_business } },
                //         {
                //             model: db.job,
                //             attributes: ['id', 'name'],
                //             include: [
                //                 { model: db.language, attributes: ['id', 'name'] },
                //                 { model: db.address, attributes: ['id', 'district'] },
                //             ],
                //         },
                //         { model: db.service, attributes: ['id', 'name'] },
                //         { model: db.candidate, attributes: ['id'], as: 'apply' },
                //     ],
                //     where: { [Op.and]: { expire: { [Op.gte]: new Date() }, status: 1 } },
                // });
                resolve({
                    status: 0,
                    mess: 'Delete Successfully',
                    // data: data1,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let findJob = (content) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.post.findAll({
                attributes: ['id', 'id_business', 'id_job', 'expire', 'status', 'createdAt'],
                include: [
                    {
                        model: db.business,
                        attributes: ['name', 'img', 'id'],
                    },
                    {
                        model: db.job,
                        attributes: ['id', 'name', 'salary_min', 'salary_max'],
                        where:
                            content.name !== '' &&
                            Sequelize.literal(`MATCH (job.name) AGAINST('${content.name}' IN NATURAL LANGUAGE MODE)`),
                        include: [
                            { model: db.language, attributes: ['id', 'name'] },
                            { model: db.address, attributes: ['id', 'district'] },
                        ],
                    },
                ],
                where: { expire: { [Op.gte]: new Date() } },
                order: [['expire', 'DESC']],
            });
            resolve({ status: 0, mess: 'findAll successfully', data });
        } catch (err) {
            reject(err);
        }
    });
};

let getAllPostByMonth = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.post.findAll({
                attributes: ['id', 'createdAt'],
                include: [{ model: db.business, attributes: ['id', 'email'], where: { id: id } }],
                order: [['createdAt', 'ASC']],
            });
            resolve({
                status: 0,
                mess: 'Find All Successfully',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllApplyByMonth = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.post.findAll({
                attributes: ['id', 'createdAt'],
                include: [
                    { model: db.business, attributes: ['id', 'email'], where: { id: id } },
                    { model: db.candidate, attributes: ['id'], as: 'apply' },
                ],
                order: [['createdAt', 'ASC']],
            });
            resolve({
                status: 0,
                mess: 'Find All Successfully',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getAll,
    getById,
    getRelate,
    getAllByIdBusiness,
    getAllExpireByIdBusiness,
    getAllSevenDayByIdBusiness,
    getAllByIdPost,
    getAllPostByID,
    updateStep,
    updateService,
    getAllHiddenByIdBusiness,
    updateState,
    deletePost,
    findJob,
    getAllPostByMonth,
    getAllApplyByMonth,
};
