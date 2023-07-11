import typejob from "../services/typejob";

const getAll = async (req, res) => {
    res.status(200).json(await typejob.getAll());
};

module.exports = { getAll };
