import expres from "express";
const router = expres.Router()
import WorkoutController from '../controllers/workout.js'

router.post('/', WorkoutController.create)
router.get('/', WorkoutController.all)
router.get('/initial', WorkoutController.init)

router.get('/:id', WorkoutController.getOne)
router.put('/:id', WorkoutController.update)
router.delete('/:id', WorkoutController.remove)


export default router