import departmentModel from "../models/department.js";
import subjectModel from "../models/subject.js";
import doctorModel from "../models/doctor.js";

export const index = async (req, res) => {
    const doctors = await doctorModel.find({}, { name: 1 }).lean();
    res.render('doctors/index', { doctors });
};

export const create = async (req, res) => {
    const department = await departmentModel.find().lean();
    const subjects = await subjectModel.find().lean();
    res.render('doctors/create', { department, subjects });
};


export const store = async (req, res) => {
    const { name, code, department, subject } = req.body;
    await doctorModel.create({
        name,
        code,
        department,
        subject
    });
    res.redirect('/doctors');
};

export const show = async (req, res) => {
    const { id } = req.params;
    const foundByDep = await doctorModel.findById(id).populate('department').lean();
    res.render('doctors/show', { foundByDep });
}