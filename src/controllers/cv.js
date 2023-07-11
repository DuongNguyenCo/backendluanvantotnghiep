import cv from "../services/cv";

const apply = async (req, res) => {
    res.status(200).json(await cv.apply(req.body, req.files));
};

module.exports = { apply };
