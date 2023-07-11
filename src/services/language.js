import db from "../models/index";

const getAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.language.findAll({
                attributes: ["id", "name"],
            });
            resolve({ status: 0, mess: "Find All Successfully", data });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { getAll };
