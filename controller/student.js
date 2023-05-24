import studentModel from "../models/student.js";
import subjectModel from "../models/subject.js";
import userModel from "../models/user.js";
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

export const save = (req, res) => {
  console.log(req.body);
  res.render("students/reg");
};

export const reg = (req, res) => {
  console.log("Student Loged in ");
  res.render("students/reg");
};

export const register = async (req, res) => {
  console.log("Students want to enroll new course");
  const subjects = await subjectModel.find({}, { name: 1 }).lean();
  res.render("students/register", { subjects });
};

export const view = (req, res) => {
  console.log("Student want to view pervious_subjects");
  res.render("students/view");
};

export const print = (req, res) => {
  console.log("Students want print courses");
  res.render("students/print");
};
/*
export const show = async (req, res) => {
  console.log("show");
};*/