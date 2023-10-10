import expres from "express";
const router = expres.Router()
import AuthController from '../controllers/auth.js'
import { registerValidation, loginValidation } from '../validations/authValidate.js'
// import checkRole from "../middlewares/checkRoleMiddleware.js"


router.post('/register', registerValidation, AuthController.register)
router.post('/addactivate', registerValidation, AuthController.addactivate)
router.post('/login', loginValidation, AuthController.login)
router.post('/admin', loginValidation, AuthController.isAdmin)
router.post('/logout', AuthController.logout)


export default router