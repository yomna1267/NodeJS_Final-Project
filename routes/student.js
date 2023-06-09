import { Router, application } from "express";

import { index, create, store, save, reg, register, view, print,save2, savesub , getupdate , updateStudent ,studentLogIn ,deleteStudent , generate} from '../controller/student.js'


const router = new Router();
router.get('/', index); // show all the students
router.get('/create', create); // get form 

router.get('/student' , studentLogIn)
router.get('/:id/print', print);
router.post('/:id/print', print);


router.get('/:id/view', view);

router.get('/:id/register', register);

router.post('/:id/register', save2);


router.post('/save', store); // post data to db

router.get('/:id')// get details of the student

router.post('/reg', save);
router.put('/reg', savesub)
 
router.get('/reg/:id' , reg);
router.post('/reg/:id',  save);
router.put('/reg/:id' , save);


router.get('/update/:id' , getupdate)
router.post('/:id' , updateStudent)
router.get('/delete/:id' , deleteStudent)


router.get('/generate', generate);

export default router;