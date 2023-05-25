import departmentModel from "../models/department.js";
import subject from "../models/subject.js";
import subjectModel from "../models/subject.js";

export const index = async (req, res) => {
const subjects = await subjectModel.find().lean();
res.render('subjects/index', { subjects });
};

export const create = async (req, res) => {
const department = await departmentModel.find().lean();
const subjects = await subjectModel.find().lean();
res.render('subjects/create', { department, subjects });
};



export const edit = async (req, res) => {
console.log("Editing is running ");
const { id } = req.params;
const department = await departmentModel.find().lean();
const subject = await subjectModel.findById(id).lean();
const subjects = await subjectModel.find().lean();

res.render('subjects/edit', { department, subject, subjects });
};

export const store = async (req, res) => {
const { name, code, department, previous } = req.body;
await subjectModel.create({
    name,
    code,
    department,
    previous,
    number_of_enrolled_students: 0
});
res.redirect('/subjects');
};
export const update = async (req, res) => {
const { name, code, department, previous } = req.body;
const { id } = req.params;
await subject.findByIdAndUpdate(id, { $set: { name, code, department, previous } });
res.redirect('/subjects');

};

export const deleteRec  = async (req, res) => {
 const { id } = req.params;
 const count = await subject.findById(id).lean();
 if(count.number_of_enrolled_students == 0){
    await subject.findByIdAndDelete(id  );
    console.log("subject is deleted");
 }else {
    console.log("Can not delete the subjcet");
 }
res.redirect('/subjects');

};

export const show = async (req, res) => {
const { id } = req.params;
const foundByDep = await subjectModel.findById(id).populate('department').lean();
res.render('subjects/show', { foundByDep });
}