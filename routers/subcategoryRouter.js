import expres from "express";
const router = expres.Router()
import SubcategoryController from '../controllers/subcategory.js'

router.post('/', SubcategoryController.create)
router.get('/', SubcategoryController.all)
router.get('/:id', SubcategoryController.getOne)
router.put('/:id', SubcategoryController.update)
router.delete('/:id', SubcategoryController.remove)


export default router