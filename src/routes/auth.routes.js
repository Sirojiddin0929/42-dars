import { Router } from 'express';
import { validate } from '../middleware/validate.middleware.js';
import { loginValidate } from '../validation/auth.validation.js';
import {login} from "../controller/auth.controller.js"
import { verifyValidate } from '../validation/auth.validation.js';
import { registerValidate} from '../validation/auth.validation.js';
import { register} from '../controller/auth.controller.js';
import { profile,refreshAccess } from '../controller/auth.controller.js';
import { authGuard } from '../middleware/authGuard.js';
import { verifyOtp } from '../controller/auth.controller.js';


const loginRouter = Router();
loginRouter .post('/', validate(loginValidate), login);


const registerRouter = Router();
registerRouter .post('/', validate(registerValidate), register);



const profileRouter = Router();
profileRouter.get('/', authGuard, profile);



const refreshRouter = Router()
refreshRouter.post('/', refreshAccess );
const verifyRouter=Router()
verifyRouter.post("/", validate(verifyValidate), verifyOtp);


const AuthRouter=Router()

AuthRouter.use("/register",registerRouter)
AuthRouter.use("/login",loginRouter)
AuthRouter.use("/profile",profileRouter)
AuthRouter.use("/refresh",refreshRouter)
AuthRouter.use("/verify",verifyRouter)


export default AuthRouter
