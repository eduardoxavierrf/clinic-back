import { IPatientRepository } from '../repositories/IPatientRepository'
import PatientRepositoryInMemory from '../repositories/PatientRepositoryInMemory'
import CreatePatientService from './CreatePatientService'

describe('Create patient', () => {
    let patientRepository: IPatientRepository
    let createPatientService: CreatePatientService

    beforeAll(async () => {
        patientRepository = new PatientRepositoryInMemory()
        createPatientService = new CreatePatientService(patientRepository)
    })

    it('should edit patient', async () => {
        const patient = await createPatientService.execute({
            name: 'test',
            email: 'test@test.com',
            telephone: '123456',
            birthday: new Date(),
        })

        expect(patient).toHaveProperty('id')
    })
})
