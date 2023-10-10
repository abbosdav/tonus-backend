import expres from "express";
const router = expres.Router()
import BilingController from '../controllers/billing.js'
// import billingMiddleware from '../middlewares/billingMiddleware.js'
// import billing from '../middlewares/billingMiddleware.js'


router.post('/prepare', BilingController.starting)
router.post('/complate', BilingController.prosess)

export default router;