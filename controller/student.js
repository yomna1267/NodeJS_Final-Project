import studentModel from "../models/student.js";


// show page of student
export const index = async (req , res)=>{
    const students = await studentModel.find().lean()
    res.render('students/index' , {students})
}

// get form page
export const create = async(req, res) =>{
  res.render('students/create' , {checkreuslt : false})
};


// post data to db
export const store = async(req, res) =>{
  const {username , password , acadimic_number} = req.body;

  try{
    const students = await studentModel.find().lean()
    const isInDb = students.find(element=> username === element.username || acadimic_number === element.acadimic_number)
    console.log(isInDb)
    if(! isInDb){ 
    await studentModel.create({
      username , password , acadimic_number : parseInt(acadimic_number) })
    res.redirect('/students')
    }
    else{
      res.render('students/create' , {checkreuslt : true})
    }
 }  
  catch(err){
    console.log(err.message)
  }
}

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
