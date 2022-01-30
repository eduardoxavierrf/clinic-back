import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import CreateUserService from '../services/CreateUserService'

export default class UserController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { email, username, password } = request.body

    const usersRepository = getCustomRepository(UserRepository)
    const createUserService = new CreateUserService(usersRepository)

    const user = await createUserService.execute({ email, username, password })

    delete user.password

    return response.status(201).json(user)
  }
}
