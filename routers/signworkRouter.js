import expres from "express";
const router = expres.Router()
import SignController from '../controllers/signworkout.js'

router.post('/', SignController.add)
// router.get('/', WorkoutController.all)
// router.get('/mobile', WorkoutController.alldata)
// router.get('/:id', WorkoutController.getOne)
// router.put('/:id', WorkoutController.update)
// router.delete('/:id', WorkoutController.remove)


export default router