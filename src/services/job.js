import db from '../models/index';

const create = async (job) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                name,
                id_type_job,
                salary_min,
                salary_max,
                quantity,
                description,
                request,
                id_language,
                id_location,
            } = job.job;
            const data = await db.job.findOrCreate({
                where: { name: name },
                defaults: {
                    id_job_type: id_type_job,
                    salary_max: salary_max,
                    salary_min: salary_min,
                    description: description,
                    request: request,
                    quantity: quantity,
                },
            });
            if (data[1]) {
                id_language.map(async (e) => {
                    await db.job_language.create({
                        id_job: data[0].dataValues.id,
                        id_language: e,
                    });
                });
                id_location.map(async (e) => {
                    await db.job_address.create({
                        id_job: data[0].dataValues.id,
                        id_address: e,
                    });
                });
                const date = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
                const dataLast = await db.post.findOrCreate({
                    where: {
                        id_job: data[0].dataValues.id,
                    },
                    defaults: {
                        id_business: job.id_business,
                        status: 0,
                        expire: date,
                        step1: 0,
                        step2: 0,
                        step3: 0,
                        step4: 0,
                        step5: 0,
                    },
                });
                resolve({ status: 0, mess: 'Create Successfully', data: dataLast[0] });
            } else resolve({ status: 1, mess: 'Create Failed' });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { create };
