import departmentModel from "../models/department.js";
import subjectModel from "../models/subject.js";

export const index = async (req, res) => {
    const subjects = await subjectModel.find({}, { name: 1 }).lean();
    res.render('subjects/index', { subjects });
};

export const create = async (req, res) => {
    const department = await departmentModel.find().lean();
    const subjects = await subjectModel.find().lean();
    res.render('subjects/create', { department, subjects });
};

export const store = async (req, res) => {
    const { name, code, department, previous } = req.body;
    await subjectModel.create({
        name,
        code,
        department,
        previous
    });
    res.redirect('/subjects');
};

export const show = async (req, res) => {
    const { id } = req.params;
    const foundByDep = await subjectModel.findById(id).populate('department').lean();
    res.render('subjects/show', { foundByDep });
}