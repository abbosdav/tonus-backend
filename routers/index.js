import expres from "express";
const router = expres.Router()
import usersRoute from "../routers/usersRouter.js"
import authRoute from "../routers/authRouter.js"
import uploadRoute from "../routers/uploadRouter.js"
import servicesRoute from '../routers/servicesRoute.js'
import blogsRoute from "../routers/blogsRouter.js"
import categoryRoute from "../routers/categoryRouter.js"
import subcategoryRoute from "../routers/subcategoryRouter.js"
import eqpsRouter from "../routers/eqpsRouter.js"
import homeRouter from "../routers/homeRouter.js"
import checkRouter from "../routers/checkRouter.js"
import workoutRouter from "../routers/workoutRouter.js"
import abonomentRouter from "../routers/abonomentRouter.js"
// import cartRouter from "../routers/cartRouter.js"
import subscribeRouter from "../routers/subscribeRouter.js"
import signworkRouter from "../routers/signworkRouter.js"
import typetimeRouter from "../routers/typetimeRouter.js"
import bilingRouter from "../routers/bilingRouter.js"


router.use('/auth', authRoute)
router.use('/upload', uploadRoute)
router.use('/services', servicesRoute)
router.use('/blogs', blogsRoute)
router.use('/categories', categoryRoute)
router.use('/subcategories', subcategoryRoute)
router.use('/equipments', eqpsRouter)
router.use('/home', homeRouter)
router.use('/check', checkRouter)
router.use('/workout', workoutRouter)
router.use('/abonoment', abonomentRouter)
router.use('/typetime', typetimeRouter)
router.use('/subscribe', subscribeRouter)
router.use('/signwork', signworkRouter)
router.use('/billing', bilingRouter)
router.use('/users', usersRoute)

export default router;