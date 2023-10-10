import expres from "express";
const router = expres.Router()
import TypetimeController from '../controllers/typetime.js'


router.post('/', TypetimeController.create)
router.get('/', TypetimeController.all)
router.put('/', TypetimeController.update)

export default router