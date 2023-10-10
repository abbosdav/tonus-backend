import expres from "express";
const router = expres.Router()
import SubscribeController from '../controllers/subscribe.js'


router.post('/', SubscribeController.add)
router.get('/check/:id', SubscribeController.check)
router.get('/', SubscribeController.all)
router.delete('/:id', SubscribeController.remove)

export default router