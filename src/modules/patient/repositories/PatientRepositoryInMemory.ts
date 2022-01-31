import { v4 } from 'uuid'
import { Patient } from '../entities/patient'
import { IPatientRepository } from './IPatientRepository'

export default class PatientRepositoryInMemory implements IPatientRepository {
    private patients: Patient[] = []

    create({ name, email, telephone, birthday }: Patient): Patient {
        const patient = new Patient()

        patient.name = name
        patient.email = email
        patient.telephone = telephone
        patient.birthday = birthday

        return patient
    }

    async save(patient: Patient): Promise<Patient> {
        patient.id = v4()
        patient.createdAt = new Date()
        patient.updatedAt = new Date()

        this.patients.push(patient)

        return patient
    }

    async findOne(id: string): Promise<Patient> {
        const patient = this.patients.find((patient) => patient.id === id)

        return patient
    }
}
