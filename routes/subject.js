import { Router } from "express" ;
import { create, index, show, store } from "../controller/subject.js";

const router = new Router();

router.get('/', index);

router.get('/create', create);

router.get('/:id', show);

router.post('/', store);

export default router;
