import AppError from '../../../shared/error/AppError'
import { User } from '../entities/user'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { hash } from 'bcryptjs'

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

        const user = this.usersRepository.create({
            email,
            username,
            password: await hash(password, 10),
        })

        await this.usersRepository.save(user)

        return user
    }
}
