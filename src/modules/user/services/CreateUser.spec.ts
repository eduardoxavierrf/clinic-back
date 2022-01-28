import AppError from '../../../shared/error/AppError'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { UsersRespositoryInMemory } from '../repositories/UsersRepositoryInMemory'
import CreateUserService from './CreateUserService'

describe('Create user', () => {
  let usersRepository: IUsersRepository
  let createUserService: CreateUserService

  beforeAll(() => {
    usersRepository = new UsersRespositoryInMemory()
    createUserService = new CreateUserService(usersRepository)
  })

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      email: 'teste@teste.com',
      username: 'teste',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
    expect(user.email).toBe('teste@teste.com')
  })

  it('should not be able to register a user with an used email', async () => {
    await expect(
      createUserService.execute({
        email: 'teste@teste.com',
        username: 'teste',
        password: '123456'
      })
    ).rejects.toMatchObject(new AppError('User already exists'))
  })

  it('should encrypt the user password', async () => {
    const password = '123456'
    const user = await createUserService.execute({
      email: 'testePassword@teste.com',
      username: 'testPassword',
      password
    })

    expect(user.password).not.toBe(password)
  })
})
