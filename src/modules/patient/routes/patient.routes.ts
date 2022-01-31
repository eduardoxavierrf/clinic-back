import { Router } from 'express'
import PatientController from '../controllers/PatientController'

const patientRouter = Router()
const patientController = new PatientController()

patientRouter.post('/', patientController.create)
patientRouter.get('/', patientController.index)
patientRouter.patch('/:id', patientController.edit)

export default patientRouter
