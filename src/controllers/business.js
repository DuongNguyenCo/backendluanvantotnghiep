import business from "../services/business";

const getAll = async (req, res) => {
    res.status(200).json(await business.getAll());
};

const getById = async (req, res) => {
    res.status(200).json(await business.getById(req.params.id));
};

const signIn = async (req, res) => {
    res.status(200).json(await business.signIn(req.body));
};
const signUp = async (req, res) => {
    res.status(200).json(await business.signUp(req.body));
};
const getBusinessById = async (req, res) => {
    res.status(200).json(await business.getBusinessById(req.params.id));
};

const update = async (req, res) => {
    res.status(200).json(await business.update(req.body));
};

module.exports = { getAll, getById, signIn, signUp, getBusinessById, update };
