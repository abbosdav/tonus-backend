import expres from "express";
const router = expres.Router()
import CheckController from '../controllers/check.js'

router.post('/', CheckController.create)
router.get('/', CheckController.all)


export default router