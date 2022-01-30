import AppError from '../../../shared/error/AppError'
import { User } from '../entities/user'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { UsersRespositoryInMemory } from '../repositories/UsersRepositoryInMemory'
import CreateSessionService from './CreateSessionService'
import CreateUserService from './CreateUserService'

// TODO: Check if dont return the password

describe('Create session', () => {
    let userRepository: IUsersRepository
    let createUserService: CreateUserService
    let createSessionService: CreateSessionService
    let testUser: User
    let password: string

    beforeAll(async () => {
        process.env.SECRET_KEY = 'PEQ$Pr1TEsp&w=chid@*cL?iYls'

        password = 'test123456'
        userRepository = new UsersRespositoryInMemory()
        createUserService = new CreateUserService(userRepository)
        testUser = await createUserService.execute({
            email: 'test@teste.com',
            username: 'teste.teste',
            password: password,
        })

        createSessionService = new CreateSessionService(userRepository)
    })

    it('should create a session', async () => {
        const { token, user } = await createSessionService.execute({
            email: testUser.email,
            password: password,
        })

        expect(token).not.toBeNull()
        expect(user).toHaveProperty('id')
    })

    it('should not authenticate with invalid password or email', async () => {
        await expect(
            createSessionService.execute({
                email: testUser.email,
                password: 'wrongPassword',
            })
        ).rejects.toMatchObject(
            new AppError('Incorrect email and password combination', 401)
        )

        await expect(
            createSessionService.execute({
                email: 'wrongEmail',
                password: password,
            })
        ).rejects.toMatchObject(
            new AppError('Incorrect email and password combination', 401)
        )
    })
})
