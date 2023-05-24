import express from "express";
import { engine } from 'express-handlebars';
import mongoose from "mongoose";
import subjectsRouter from './routes/subject.js';
import departmentRouter from './routes/department.js';
import studentsRouter from './routes/student.js'
import dotenv from 'dotenv';

// load environment to process.env
dotenv.config();

// create connection 
mongoose.connect(process.env.mongoConnectionUrl);
const db = mongoose.connection;

db.once("open" , ()=> { 
    console.log("db connection is created")
})

db.on("error", console.error.bind(console, "connection error:"));

// server configuration
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({extended : true}));

app.use('/subjects', subjectsRouter);
app.use('/departments', departmentRouter);
app.use('/students' , studentsRouter)
app.listen(process.env.PORT, () =>{
    console.log("started the application")
});