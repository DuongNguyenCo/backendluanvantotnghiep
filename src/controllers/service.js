import service from "../services/service";

const getAllByBusiness = async (req, res) => {
    res.status(200).json(await service.getAllByBusiness(req.params.id));
};

module.exports = { getAllByBusiness };
