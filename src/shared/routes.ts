import { Router } from 'express'
import sessionRouter from '../modules/user/routes/session.routes'
import userRouter from '../modules/user/routes/user.routes'

const router = Router()

router.use('/users', userRouter)
router.use('/auth', sessionRouter)

export default router
