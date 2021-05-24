import Express from "express";
import { signup, auth, signIn } from "../controllers/user.js";
const router = Express.Router();


router.post('/signup/:role', signup);

router.post('/signin', signIn);

router.get('/auth/:token', auth);

export default router;





