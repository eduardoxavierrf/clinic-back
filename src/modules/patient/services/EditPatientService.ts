import { Patient } from '../entities/patient'
import { IPatientRepository } from '../repositories/IPatientRepository'

interface IPatientRequest {
    id: string

    name?: string

    email?: string

    telephone?: string

    birthday?: Date
}

export default class EditPatientService {
    constructor(private patientRepository: IPatientRepository) {
        this.patientRepository = patientRepository
    }

    public async execute({
        id,
        name,
        email,
        telephone,
        birthday,
    }: IPatientRequest): Promise<Patient> {
        const patient = await this.patientRepository.findOne(id)

        if (name) {
            patient.name = name
        }

        if (email) {
            patient.email = email
        }

        if (telephone) {
            patient.telephone = telephone
        }

        if (birthday) {
            patient.birthday = birthday
        }

        this.patientRepository.save(patient)

        return patient
    }
}
