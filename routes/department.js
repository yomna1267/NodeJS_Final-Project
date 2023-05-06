import { Router } from "express" ;
import { create, index, show, store } from "../controller/department.js";

const router = new Router();

router.get('/', index);

router.get('/create', create);

router.post('/', store);

router.get('/:id', show);

export default  router;
