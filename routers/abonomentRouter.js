import expres from "express";
const router = expres.Router()
import AbonomentController from '../controllers/abonoment.js'

router.post('/', AbonomentController.create)
router.get('/', AbonomentController.all)
router.get('/admin/', AbonomentController.alladmin)
router.get('/:id', AbonomentController.getOne)
router.put('/:id', AbonomentController.update)
router.delete('/:id', AbonomentController.remove)


export default router