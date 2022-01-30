import { EntityRepository, Repository } from 'typeorm'
import { User } from '../entities/user'
import { IUsersRepository } from './IUsersRepository'

@EntityRepository(User)
export class UserRepository
    extends Repository<User>
    implements IUsersRepository
{
    async exists(username: string, email: string): Promise<boolean> {
        const emailExists = await this.findOne({ where: { email } })
        const usernameExists = await this.findOne({ where: { username } })

        if (emailExists || usernameExists) {
            return true
        }

        return false
    }
}
