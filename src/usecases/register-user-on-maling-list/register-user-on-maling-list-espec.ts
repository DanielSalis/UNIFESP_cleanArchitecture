import { UserData } from '../../entities/user-data'
import { UserRepository } from './ports/user-repository'
import { RegisterUserOnMailingList } from './register-user-on-maling-list'
import { InMemoryUserRepository } from './repository/in-memory-user-repository'

describe('Register User on Mailing List use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any_@email.com'
    const response = await usecase.registerUserOnMainlingList({ name, email })
    const user = repo.findUserByEmail(email)
    expect(await user).toBe(name)
    expect(response.value.name).toBe('any_name')
  })
})
