import { User } from './user.entity'

interface UserRepository {
  findByEmail (email: string): Promise<User | undefined>
  save(user: User): Promise<void>
}

export { UserRepository }
