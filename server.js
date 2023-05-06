import express from "express";
import { engine } from 'express-handlebars';
import mongoose from "mongoose";
import subjectsRouter from './routes/subject.js';
import departmentRouter from './routes/department.js';

import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.mongoConnectionUrl);

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({extended : true}));

app.use('/subjects', subjectsRouter);
app.use('/departments', departmentRouter);

app.listen(process.env.PORT, () =>{
    console.log("started the application")
});