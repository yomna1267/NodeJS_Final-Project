import departmentModel from "../models/department.js";
import userModel from "../models/user.js";
import subjectModel from "../models/subject.js";
import doctorModel from "../models/doctor.js";
import bcrypt from 'bcryptjs';

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

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(code, salt);


    await doctorModel.create({
        name,
        code: hash,
        department,
        subject
    });

    await userModel.create({username: name, password: hash, role: 'doctor'});
    
    res.redirect('/doctors');
};

export const show = async (req, res) => {
    const { id } = req.params;
    const foundByDep = await doctorModel.findById(id).populate('department').lean();
    res.render('doctors/show', { foundByDep });
}