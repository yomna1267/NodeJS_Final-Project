import express from "express";
import { engine } from 'express-handlebars';
import mongoose from "mongoose";
import subjectsRouter from './routes/subject.js';
import departmentRouter from './routes/department.js';
import studentsRouter from './routes/student.js'
import doctorRouter from './routes/doctor.js'
import authRouter from './routes/auth.js'
import adminRouter from './routes/admin.js'
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { validateToken } from "./middlewares/auth.js";
import   MethodOverrideOptions   from "method-override";

// load environment variables to process.env
dotenv.config();

// create connection 
mongoose.connect(process.env.mongoConnectionUrl);
const db = mongoose.connection;

db.once("open", () => {
    console.log("db connection is created")
})

db.on("error", console.error.bind(console, "connection error:"));

// server configuration
const app = express();
app.use(MethodOverrideOptions('_method'))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// To view the data in req.body
app.use(express.urlencoded({ extended: true }));

// Use cookie parser
app.use(cookieParser());

// Routs
app.use('/', authRouter);
app.use('/subjects', validateToken, subjectsRouter);
app.use('/departments', validateToken, departmentRouter);
app.use('/students', validateToken, studentsRouter);
app.use('/doctors', validateToken, doctorRouter);
app.use('/adminRedirection', adminRouter);

app.get('reg' , (req , res) => {
    res.render('reg' , {layout: false})
})

app.listen(process.env.PORT, () => {
    console.log(`started the application on http://localhost:${process.env.PORT}/login`);
});