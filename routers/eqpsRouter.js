import expres from "express";
const router = expres.Router()
import EqpsController from "../controllers/equipments.js"

router.post('/', EqpsController.create)
router.get('/', EqpsController.all)
router.get('/:id', EqpsController.getOne)
router.put('/:id', EqpsController.update)
router.delete('/:id', EqpsController.remove)


export default router