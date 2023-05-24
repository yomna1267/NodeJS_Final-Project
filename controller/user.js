import user from "../models/user.js";
import studentModel from "../models/student.js";
import bcrypt from 'bcryptjs';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';

export const registerFormGet = (req, res) => {
    res.render('authentication/register');
}

export const registerFormPost = async (req, res) => {
    const { username, password, role } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await user.create({ username, password: hash, role });
    res.redirect('/login');
}

export const loginFormGet = (req, res) => {
    res.render('authentication/login');
}

export const loginFormPost = async (req, res) => {
    const username = req.body.username;
    const pass = req.body.password;
    const role = req.body.role;

    let loggedUser;

    if(role == 'student') {
        loggedUser = await studentModel.findOne({ username });
    } 
    else if(role == 'professor') {
        loggedUser = await doctor.findOne({ username });
    } 
    else loggedUser = await user.findOne({ username });

    if(!loggedUser) {
        console.log(role);
        console.log(username);
        console.log(pass);
        return res.send("There's no account with this Username. Please call the administrator to add an account for you");
    }
    
    const isCorrectPass = bcrypt.compareSync(pass, loggedUser.password);
    if (!isCorrectPass) 
        return res.send("Wrong Password<br> go back to <a href='/login'>login</a>");

    const data = {
        _id: loggedUser._id,
        username: loggedUser.username,
    }

    const jwtToken = jwt.sign(data, process.env.JWT_SECRET);

    res.cookie('token', jwtToken);

    if(role == 'admin') return res.redirect('/adminRedirection');
    if(role == 'doctor') return res.redirect('/doctors');
    return res.redirect('/students/reg');
}