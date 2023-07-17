import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import stream from 'stream';
dotenv.config();
import nodemailer from 'nodemailer';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN_CLOUD = process.env.REFRESH_TOKEN_CLOUD;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN_CLOUD });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

export const hashPassword = async (pass) => {
    return await bcrypt.hash(pass, 10);
};
export const checkPassword = (passInput, passDB) => {
    return bcrypt.compareSync(passInput, passDB);
};
export const accessToken = (data) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN, { expiresIn: '30s' });
};

export const refreshToken = (data) => {
    return jwt.sign(data, process.env.REFREST_TOKEN, { expiresIn: '365d' });
};

export const createFolder = async () => {
    const result = await drive.files.create({
        requestBody: {
            name: 'CV',
            mimeType: 'application/vnd.google-apps.folder',
        },
        fields: 'id',
    });
    return result.data.id;
};

const configUpload = (fileId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await drive.permissions.create({
                fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone',
                },
            });
            const getURL = await drive.files.get({
                fileId,
                fields: 'webViewLink, webContentLink',
            });
            resolve(getURL);
        } catch (e) {
            reject(e);
        }
    });
};

export const upload = (file, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bufferStream = new stream.PassThrough();
            bufferStream.end(file.file.data);
            const result = await drive.files.create({
                requestBody: {
                    name: name,
                    mimeType: file.file.mimetype,
                    parents: [process.env.ID_FOLDER_CV],
                },
                media: {
                    mimeType: file.file.mimetype,
                    body: bufferStream,
                },
            });
            const url = await configUpload(result.data.id);
            resolve({ link: url.data, id: result.data.id });
        } catch (e) {
            reject(e);
        }
    });
};

export const deleteFile = (fileId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await drive.files.delete({
                fileId,
            });
        } catch (e) {
            reject(e);
        }
    });
};

export const sendEmail = async (emailFrom, emailTo, content) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });
    await transporter.sendMail({
        from: emailFrom, // sender address
        to: emailTo, // list of receivers
        subject: 'DNCJOB website tìm kiếm việc làm',
        html: content, // html body
    });
};

export const randomPassword = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};
