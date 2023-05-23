import studentModel from "../models/student.js";

export const index = async (req, res) => {
  const students = await studentModel.find().lean()
  res.render('students/index', { students })
}

export const create = async (req, res) => {
  res.render('students/create')
};

export const store = async (req, res) => {
  const { username, password, acadimic_number } = req.body;
  try {
    await studentModel.create({
      username, password, acadimic_number: parseInt(acadimic_number)
    })
    res.redirect('/students')
  }
  catch (err) {
    console.log(err.message)
  }
}

export const show = async (req, res) => {
  console.log("show")
}