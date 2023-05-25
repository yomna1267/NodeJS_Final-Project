import { Router } from "express" ;
import { create, index, show, store , edit , update,deleteRec} from "../controller/subject.js";

const router = new Router();

router.get('/', index);

router.get('/create', create);

router.get('/:id/edit', edit);

router.get('/:id', show);

router.put('/:id', update);

router.delete('/:id',deleteRec);


router.post('/', store);

export default router;
