import expres from "express";
const router = expres.Router()
import UserController from "../controllers/user.js"



router.get('/', UserController.all)
router.get('/:id', UserController.details)
router.get('/check/:id', UserController.check)
router.get('/work/:id', UserController.getwork)
router.get('/subscribe/:id', UserController.getsubscribe)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.remove)
router.post('/:id', UserController.changestatus)



export default router