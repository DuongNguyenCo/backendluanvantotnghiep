import language from "../services/language";

const getAll = async (req, res) => {
    res.status(200).json(await language.getAll());
};

module.exports = { getAll };
