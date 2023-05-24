import { Router } from "express";

import { index, create, store, save, reg, register, view, print } from '../controller/student.js'


const router = new Router();
router.get('/', index); // show all the students

router.get('/create', create); // get form 

router.post('/', store); // post data to db

//router.get('/:id', show); // get details of the student

////////////////////////////

router.post('/reg', reg );
router.get('/reg', (req, res) => {
    console.log("Student Loged in ");
    res.render("students/reg");
});
 

router.get('/register', register);

router.get('/print', print);

router.get('/view', view);

export default router;