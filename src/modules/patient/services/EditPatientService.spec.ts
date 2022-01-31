import { Patient } from '../entities/patient'
import { IPatientRepository } from '../repositories/IPatientRepository'
import PatientRepositoryInMemory from '../repositories/PatientRepositoryInMemory'
import CreatePatientService from './CreatePatientService'
import EditPatientService from './EditPatientService'

describe('Edit patient', () => {
    let patientRepository: IPatientRepository
    let createPatientService: CreatePatientService
    let editPatientService: EditPatientService
    let editPatient: Patient

    beforeAll(async () => {
        patientRepository = new PatientRepositoryInMemory()
        createPatientService = new CreatePatientService(patientRepository)
        editPatientService = new EditPatientService(patientRepository)

        editPatient = await createPatientService.execute({
            name: 'test',
            email: 'test@test.com',
            telephone: '123456',
            birthday: new Date(),
        })
    })

    it('should edit patient', async () => {
        const patient = await editPatientService.execute({
            id: editPatient.id,
            name: 'testPatient',
            email: 'patient@test.com',
            telephone: '654321',
            birthday: new Date(),
        })

        expect(patient.name).toBe('testPatient')
        expect(patient.email).toBe('patient@test.com')
        expect(patient.telephone).toBe('654321')
    })
})
