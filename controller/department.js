import departmentModel from "../models/department.js";
import subjectModel from "../models/subject.js";

export const index = async (req, res)=>{

    const departments = await departmentModel.find({}, {name : 1}).lean();
    res.render('departments/index', {departments});
};

export const create = async(req, res) =>{
    const department = await departmentModel.find().lean();
    const subjects = await subjectModel.find().lean();
    res.render('departments/create', {department, subjects});
};

export const store = async(req, res) =>{
    const {name , code} = req.body;
   await departmentModel.create({
    name,
    code,
   });
   res.redirect('/departments');
};

export const show = async(req, res) =>{
    const {id} = req.params;
    const found = await departmentModel.findById(id).lean();
    console.log(found);
    res.render('departments/show', {found});
}