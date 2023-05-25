import studentModel from "../models/student.js";
import subjectModel from "../models/subject.js";
import userModel from "../models/user.js";
import subject from "../models/subject.js";
import { createObjectCsvWriter } from "csv-writer";
import fs from 'fs'

import bcrypt from 'bcryptjs';

export const index = async (req, res) => {
  const students = await studentModel.find().lean()
  res.render('students/index', { students })
};

export const studentLogIn = (req , res)=>{
   res.render("students/reg")
}


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


export const getupdate = async(req , res)=>{
  const {id} = req.params;
  const student = await studentModel.findById(id).lean();
  console.log(student);
  res.render('students/create' , {student , update : true})
}

export const updateStudent = async(req , res)=>{
 const {id} = req.params;
 const {username , password , acadimic_number} = req.body;
 console.log(username  + " " + password)
 try{
   await studentModel.findByIdAndUpdate(id , {username , password})
   res.redirect('/students')
 }
 catch(err){
   console.log(err.message)
 }
}

export const deleteStudent = async(req , res)=>{
   const {id} = req.params;
   await studentModel.findOneAndDelete({"_id" : id})
   req.method = "GET"
   res.redirect('/students')
}


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

export const generate = async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await studentModel.find({}, 'username');
 
    // Prepare data for CSV
    const csvData = students.map(student => ({
      name: student.username
    }));
 
    // Define the CSV file path
    const csvFilePath = './students.csv';
 
    // Create a CSV writer instance
    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: [{ id: 'name', title: 'Name' },
        {title:"Week1"},
        {title:"Week2"},
        {title:"Week3"},
        {title:"Week4"},
        {title:"Week5"},
        {title:"Week6"},
        {title:"Week7"},
        {title:"Week8"},
        {title:"Week9"},
        {title:"Week10"} 
    ]
    });
 
    // Write the data to the CSV file
    await csvWriter.writeRecords(csvData);
 
    // Send the generated CSV file as a response
    res.download(csvFilePath, 'students.csv', err => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
 
      // Delete the CSV file after it is sent
      fs.unlinkSync(csvFilePath);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
 
