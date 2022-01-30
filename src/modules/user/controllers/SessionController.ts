import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import CreateSessionService from '../services/CreateSessionService'

export default class SessionController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { email, password } = request.body

        const userRepository = getCustomRepository(UserRepository)
        const createSessionService = new CreateSessionService(userRepository)

        const { token, user } = await createSessionService.execute({
            email,
            password,
        })

        delete user.password

        return response.status(201).json({ token, user })
    }
}
