import { Router } from "express" ;
import { registerFormGet, registerFormPost, loginFormGet, loginFormPost } from "../controller/user.js";

const router = new Router();

router.get('/register', registerFormGet);

router.post('/register', registerFormPost);


router.get('/login', loginFormGet);

router.post('/login', loginFormPost);

export default router;
