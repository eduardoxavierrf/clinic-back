import { Router } from 'express'
import patientRouter from '../modules/patient/routes/patient.routes'
import sessionRouter from '../modules/user/routes/session.routes'
import userRouter from '../modules/user/routes/user.routes'
import ensureAuthentication from './middleware/ensureAuthentication'

const router = Router()

router.use('/users', userRouter)
router.use('/auth', sessionRouter)
router.use('/patients', ensureAuthentication, patientRouter)

export default router
