import { Router } from "express" ;
import { index , create , store , show} from '../controller/student.js'


const router = new Router();
router.get('/', index); // show all the students

router.get('/create', create); // get form 

router.post('/', store); // post data to db

router.get('/:id', show); // get details of the student

export default router;