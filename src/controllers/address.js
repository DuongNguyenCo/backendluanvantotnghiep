import address from '../services/address';

const getAll = async (req, res) => {
    res.status(200).json(await address.getAll(req.params.id));
};
const newAddress = async (req, res) => {
    res.status(200).json(await address.newAddress(req.body));
};

const deleteAddress = async (req, res) => {
    res.status(200).json(await address.deleteAddress(req.params));
};

module.exports = { getAll, newAddress, deleteAddress };
