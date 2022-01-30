import { compare } from 'bcryptjs'
import AppError from '../../../shared/error/AppError'
import { User } from '../entities/user'
import { IUsersRepository } from '../repositories/IUsersRepository'

import { sign } from 'jsonwebtoken'

interface ISessionRequest {
    email: string
    password: string
}

interface ISessionResponse {
    token: string
    user: User
}

export default class CreateSessionService {
    constructor(private userRepository: IUsersRepository) {
        this.userRepository = userRepository
    }

    public async execute({
        email,
        password,
    }: ISessionRequest): Promise<ISessionResponse> {
        const user = await this.userRepository.findOneByEmail(email, true)

        if (!user) {
            throw new AppError('Incorrect email and password combination', 401)
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError('Incorrect email and password combination', 401)
        }

        const token = sign({}, process.env.SECRET_KEY, {
            subject: user.id,
            expiresIn: '8h',
        })

        return { token, user }
    }
}
