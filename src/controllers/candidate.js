import candidate from "../services/candidate";

let login = async (req, res) => {
    res.status(200).json(await candidate.login(req.body));
};

let register = async (req, res) => {
    res.status(200).json(await candidate.register(req.body));
};

const getById = async (req, res) => {
    res.status(200).json(await candidate.getById(req.params.id));
};
module.exports = { login, register, getById };
