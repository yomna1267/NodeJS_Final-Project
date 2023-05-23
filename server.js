import express from "express";
import { engine } from 'express-handlebars';
import mongoose from "mongoose";
import subjectsRouter from './routes/subject.js';
import departmentRouter from './routes/department.js';
import studentsRouter from './routes/student.js'
import doctorRouter from './routes/doctor.js'
import authRouter from './routes/auth.js'
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { validateToken } from "./middlewares/auth.js";

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

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// To view the data in req.body
app.use(express.urlencoded({ extended: true }));

// Use cookie parser
app.use(cookieParser());

app.use('/', authRouter);
app.use('/subjects', validateToken, subjectsRouter);
app.use('/departments', validateToken, departmentRouter);
app.use('/students', validateToken, studentsRouter);
app.use('/doctors', validateToken, doctorRouter);


app.listen(process.env.PORT, () => {
    console.log(`started the application on http://localhost:${process.env.PORT}/login`);
});