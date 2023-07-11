import { where } from "sequelize";
import db from "../models/index";
import { hashPassword, checkPassword, refreshToken, accessToken } from "./function";
import { dataform } from "googleapis/build/src/apis/dataform";
let login = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.candidate.findOne({
                where: { email: payload.email },
                attributes: ["id", "email", "first_name", "last_name", "password"],
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
                        mess: "Successful Search",
                        data: { ...other, id, email },
                        tokenAccess,
                        tokenRefresh,
                    });
                } else resolve({ status: 1, mess: "Incorrect information" });
            } else {
                resolve({ status: -1, mess: "Not Found" });
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
                resolve({ status: 0, mess: "Create Successfully" });
            } else {
                resolve({ status: -1, mess: "User Already Exists" });
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
                attributes: ["id", "first_name", "last_name", "email"],
                where: { id: id },
            });
            resolve({ status: 0, mess: "Find Successfully", data });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { login, register, getById };
