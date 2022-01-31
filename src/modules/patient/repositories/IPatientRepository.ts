import { Patient } from '../entities/patient'

export interface IPatientRepository {
    create({ name, email, telephone, birthday }): Patient
    save(user: Patient): Promise<Patient>
}
