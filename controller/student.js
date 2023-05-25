import studentModel from "../models/student.js";
import subjectModel from "../models/subject.js";
import userModel from "../models/user.js";
import subject from "../models/subject.js";

import bcrypt from 'bcryptjs';

export const index = async (req, res) => {
  const students = await studentModel.find().lean()
  res.render('students/index', { students })
};

export const create = async (req, res) => {
  res.render('students/create')
};

export const store = async (req, res) => {
  const { username, password, acadimic_number } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  let found = await studentModel.findOne({ username });
  if (found) return res.send("This username is already taken");

  try {
    await studentModel.create({
      username, password: hash, acadimic_number: parseInt(acadimic_number)
    });
    await userModel.create({
      username, password: hash, role: 'student'
    });

    res.redirect('/students')
  }
  catch (err) {
    console.log(err.message)
  }
};

////////////////////////////////////////

export const save = async(req, res) => {
  console.log(req.body);
  const { name } = req.body ;
  const { id } = req.params;
  await subject.findByIdAndUpdate(id, {$push:{enrolled_subjects : name }},{new :true} );
 };
export const save2 = (req, res) => {
  console.log(req.body);
  console.log("HHHH");
   res.render("students/reg");
};

export const reg = async (req, res) => {
  console.log("Student Loged in ");
  const {id} = req.params;
  const student = await studentModel.findById(id).lean();
  res.render("students/reg",{student});
};

export const register = async (req, res) => {
  console.log("Students want to enroll new course");
  const subjects = await subjectModel.find({}, { name: 1 }).lean();
  const {id} = req.params;
  const student = await studentModel.findById(id).lean();

  res.render("students/register", { subjects,student });
};

export const view = async(req, res) => {
  const {id} = req.params;
  console.log("Student want to view pervious_subjects");
  const ret = await studentModel.findById(id).lean();
  const student = ret.pervious_subjects;
  console.log(req.params);
  res.render("students/view",{student});
};

export const print = async (req, res) => {
  console.log("Students want print courses");
  const {id} = req.params;
  console.log("ss");
  const foundByDep = await studentModel.findById(id).lean();

  const student = foundByDep.enrolled_subjects;

 
    res.render("students/print",{student});
};

export const savesub = async (req, res) => {
    console.log(req.params );
 
  
};

/*
export const show = async (req, res) => {
  console.log("show");
};*/