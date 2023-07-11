import email from '../services/email_tamplate';

const getEmailByBusiness = async (req, res) => {
    res.status(200).json(await email.getEmailByBusiness(req.params.id));
};
const create = async (req, res) => {
    res.status(200).json(await email.create(req.body));
};
const deleteEmail = async (req, res) => {
    res.status(200).json(await email.deleteEmail(req.params));
};

module.exports = { getEmailByBusiness, create, deleteEmail };
