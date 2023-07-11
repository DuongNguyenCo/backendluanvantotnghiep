import job from "../services/job";

const create = async (req, res) => {
    res.status(200).json(await job.create(req.body));
};

module.exports = { create };
