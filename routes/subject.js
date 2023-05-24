import { Router } from "express" ;
import { create, index, show, store, edit, deleteRec } from "../controller/subject.js";

const router = new Router();

router.get('/', index);

router.get('/create', create);

router.get('/:id', show);

router.post('/', store);

//////////////

router.get('/:id/edit', edit);
router.delete('/:id',deleteRec);

export default router;
