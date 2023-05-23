import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    }
    catch (error) {
        res.redirect('/login');
    }
};