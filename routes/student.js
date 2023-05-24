import { Router } from "express" ;
import { index , create , store , getupdate, deleteStudent , updateStudent} from '../controller/student.js'


const router = new Router();
router.get('/', index); // show all the students

router.get('/create', create); // get form 

router.post('/save', store); // post data to db

router.get('/update/:id' , getupdate)

router.post('/update' , updateStudent)

router.get('/delete/:id' , deleteStudent)

export default router;