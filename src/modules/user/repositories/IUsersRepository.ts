import { User } from '../entities/user'

export interface IUsersRepository {
    create({ email, username, password }): User
    exists(username: string, email: string): Promise<boolean>
    save(user: User): Promise<User>
    findOne(id: string): Promise<User | undefined>
    findOneByEmail(
        email: string,
        selectPassword: boolean
    ): Promise<User | undefined>
}
