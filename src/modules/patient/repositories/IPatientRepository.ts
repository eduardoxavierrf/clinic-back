import { Patient } from '../entities/patient'

export interface IPatientRepository {
    create({ name, email, telephone, birthday }): Patient
    save(patient: Patient): Promise<Patient>
    findOne(id: string): Promise<Patient>
}
