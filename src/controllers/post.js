import post from "../services/post";

let getAll = async (req, res) => {
    res.status(200).json(await post.getAll());
};

let getById = async (req, res) => {
    res.status(200).json(await post.getById(req.params.id));
};
let getRelate = async (req, res) => {
    res.status(200).json(await post.getRelate(req.query.relate));
};
const getAllByIdBusiness = async (req, res) => {
    res.status(200).json(await post.getAllByIdBusiness(req.params.id));
};
const getAllByIdPost = async (req, res) => {
    res.status(200).json(await post.getAllByIdPost(req.params.id));
};

const getAllPostByID = async (req, res) => {
    res.status(200).json(await post.getAllPostByID(req.params.id));
};

const updateStep = async (req, res) => {
    res.status(200).json(await post.updateStep(req.body));
};

const updateService = async (req, res) => {
    res.status(200).json(await post.updateService(req.body));
};

const getAllExpireByIdBusiness = async (req, res) => {
    res.status(200).json(await post.getAllExpireByIdBusiness(req.params.id));
};

const getAllHiddenByIdBusiness = async (req, res) => {
    res.status(200).json(await post.getAllHiddenByIdBusiness(req.params.id));
};

const getAllSevenDayByIdBusiness = async (req, res) => {
    res.status(200).json(await post.getAllSevenDayByIdBusiness(req.params.id));
};
const updateState = async (req, res) => {
    res.status(200).json(await post.updateState(req.body));
};

const deletePost = async (req, res) => {
    res.status(200).json(await post.deletePost(req.body));
};
const findJob = async (req, res) => {
    res.status(200).json(await post.findJob(req.body));
};
const getAllPostByMonth = async (req, res) => {
    res.status(200).json(await post.getAllPostByMonth(req.params.id));
};
const getAllApplyByMonth = async (req, res) => {
    res.status(200).json(await post.getAllApplyByMonth(req.params.id));
};

module.exports = {
    getAll,
    getById,
    getRelate,
    getAllByIdBusiness,
    getAllSevenDayByIdBusiness,
    getAllByIdPost,
    getAllPostByID,
    updateStep,
    updateService,
    getAllExpireByIdBusiness,
    getAllHiddenByIdBusiness,
    updateState,
    deletePost,
    findJob,
    getAllPostByMonth,
    getAllApplyByMonth,
};
