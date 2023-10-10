import expres from "express";
const router = expres.Router()
import CartController from '../controllers/cart.js'

router.post('/', CartController.add)


export default router