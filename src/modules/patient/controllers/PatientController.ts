import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Patient } from '../entities/patient'
import CreatePatientService from '../services/CreatePatientService'
import EditPatientService from '../services/EditPatientService'

export default class PatientController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { name, email, telephone, birthday } = request.body

        const patientRepository = getRepository(Patient)
        const createPatientService = new CreatePatientService(patientRepository)

        const patient = await createPatientService.execute({
            name,
            email,
            telephone,
            birthday,
        })

        return response.status(201).json(patient)
    }

    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        const patientRepository = getRepository(Patient)

        const patients = await patientRepository.find()

        return response.status(200).json(patients)
    }

    public async edit(request: Request, response: Response): Promise<Response> {
        const { name, email, telephone, birthday } = request.body
        const { id } = request.params

        const patientRepository = getRepository(Patient)
        const editPatientService = new EditPatientService(patientRepository)

        const patient = await editPatientService.execute({
            id,
            name,
            email,
            telephone,
            birthday,
        })

        return response.status(200).json(patient)
    }
}
