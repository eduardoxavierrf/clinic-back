import AppError from '../../../shared/error/AppError'
import { User } from '../entities/user'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { hash } from 'bcrypt'

interface IUserRequest {
    email: string
    username: string
    password: string
}

export default class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository
    }

    async execute({ email, username, password }: IUserRequest): Promise<User> {
        const userExists = await this.usersRepository.exists(username, email)

        if (userExists) {
            throw new AppError('User already exists')
        }

        password = await hash(password, 11)

        const user = this.usersRepository.create({ email, username, password })

        await this.usersRepository.save(user)

        return user
    }
}
