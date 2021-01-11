import { InvalidEmailError } from '../../entities/errors/invalid-email-error'
import { InvalidNameError } from '../../entities/errors/invalid-name-error'
import { UserData } from '../../entities/user-data'
import { left } from '../../shared/either'
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

  test('should not add user with invalid email to maling list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const invalidemail = 'invalid_email'
    const response = await usecase.registerUserOnMainlingList({ name: name, email: invalidemail })
    const user = await repo.findUserByEmail('invalidemail')
    expect(user).toBeNull()
    expect(response).toEqual(left(new InvalidEmailError()))
  })

  test('should not add user with invalid name to maling list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const invalidname = ''
    const email = 'any@mail.com'
    const response = await usecase.registerUserOnMainlingList({ name: invalidname, email: email })
    const user = await repo.findUserByEmail(email)
    expect(user).toBeNull()
    expect(response).toEqual(left(new InvalidNameError()))
  })
})
