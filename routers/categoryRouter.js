import expres from "express";
const router = expres.Router()
import CategoryController from '../controllers/category.js'

router.post('/', CategoryController.create)
router.get('/', CategoryController.all)
router.get('/mobile', CategoryController.alldata)
router.get('/:id', CategoryController.getOne)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.remove)


export default router