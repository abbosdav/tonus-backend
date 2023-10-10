import expres from "express";
const router = expres.Router()
import ServiceController from '../controllers/service.js'

router.post('/', ServiceController.create)
router.get('/', ServiceController.all)
router.get('/:id', ServiceController.getOne)
router.put('/:id', ServiceController.update)
router.delete('/:id', ServiceController.remove)


export default router