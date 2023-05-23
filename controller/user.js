import user from "../models/user.js";
import bcrypt from 'bcryptjs';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';

export const registerFormGet = (req, res) => {
    res.render('authentication/register');
}

export const registerFormPost = async (req, res) => {
    const { username, email, password, role } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await user.create({ username, email, password: hash, role });
    res.redirect('/login');
}

export const loginFormGet = (req, res) => {
    res.render('authentication/login');
}

export const loginFormPost = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    const role = req.body.role;

    const loggedUser = await user.findOne({ email });
    if(!loggedUser)
        return res.send("No such an email<br> go back to <a href='/login'>login</a> or <a href='/register'>register</a>");
    
    const isCorrectPass = bcrypt.compareSync(pass, loggedUser.password);
    if (role !== loggedUser.role || !isCorrectPass) 
        return res.send("Wrong Password or Role<br> go back to <a href='/login'>login</a> or <a href='/register'>register</a>");

    const data = {
        _id: loggedUser._id,
        email: loggedUser.email,
    }

    const jwtToken = jwt.sign(data, process.env.JWT_SECRET);

    res.cookie('token', jwtToken);

    if(role == 'admin') return res.redirect('/students');
    if(role == 'professor') return res.redirect('/doctors');
    return res.redirect('/subjects');
}