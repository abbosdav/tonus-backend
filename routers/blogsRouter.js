import expres from "express";
const router = expres.Router()
import BlogController from '../controllers/blog.js'

router.post('/', BlogController.create)
router.get('/', BlogController.all)
router.get('/:id', BlogController.getOne)
router.put('/:id', BlogController.update)
router.delete('/:id', BlogController.remove)


export default router