import db from '../models/index';
import { upload } from './function';
const apply = (infor, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cv_post = await db.cv_post.findOne({
                where: { id_post: infor.id_post, id_candidate: infor.id_candidate },
            });
            if (!cv_post) {
                const resultUpload = await upload(file, infor.id_candidate);
                const cv = await db.cv.create({
                    id: resultUpload.id,
                    id_candidate: infor.id_candidate,
                    file: resultUpload.link.webContentLink,
                });
                await db.cv_post.create({
                    id_post: infor.id_post,
                    id_candidate: infor.id_candidate,
                    id_cv: cv.dataValues.id,
                    description: infor.description,
                    status: -1,
                });
                resolve({ status: 0, mess: 'successful application' });
            }
            resolve({ status: -1, mess: 'This post has been applied by the candidate' });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { apply };
