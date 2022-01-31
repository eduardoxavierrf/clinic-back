import { Patient } from '../entities/patient'
import { IPatientRepository } from '../repositories/IPatientRepository'

interface IPatientRequest {
    name: string

    email: string

    telephone: string

    birthday: Date
}

export default class CreatePatientService {
    constructor(private patientRepository: IPatientRepository) {
        this.patientRepository = patientRepository
    }

    public async execute({
        name,
        email,
        telephone,
        birthday,
    }: IPatientRequest): Promise<Patient> {
        const patient = this.patientRepository.create({
            name,
            email,
            telephone,
            birthday,
        })

        await this.patientRepository.save(patient)

        return patient
    }
}
