import { Router } from 'express'
import PatientController from '../controllers/PatientController'

const patientRouter = Router()
const patientController = new PatientController()

patientRouter.post('/', patientController.create)

export default patientRouter
