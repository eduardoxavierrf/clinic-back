import { User } from '../entities/user'
import { IUsersRepository } from './IUsersRepository'
import { v4 } from 'uuid'

export class UsersRespositoryInMemory implements IUsersRepository {
    private users: User[] = [];

    create ({ email, username, password }): User {
      const user = new User()
      user.email = email
      user.username = username
      user.password = password

      return user
    }

    async save (user: User): Promise<User> {
      user.id = v4()
      user.createdAt = new Date()
      user.updatedAt = null

      this.users.push(user)

      return user
    }

    async exists (username: string, email: string): Promise<boolean> {
      const userExists = this.users.some((user) => user.username === username) && this.users.some((user) => user.email === email)

      return userExists
    }

    async findOne (id: string): Promise<User> {
      const user = this.users.find(user => user.id === id)

      return user
    }
}
