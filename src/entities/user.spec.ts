import { User } from './user'
import { left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'

describe('User class entity', () => {
  test('should not create user with invalid email address', () => {
    const error = User.create({ name: 'any_name', email: 'invalid_email' })
    expect(error).toEqual(left(new InvalidEmailError()))
  })

  test('should not create user with invalid name (too few characters)', () => {
    const error = User.create({ name: 'O     ', email: 'any@mail.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should not create user with invalid name (too many characters)', () => {
    const error = User.create({ name: 'O'.repeat(257), email: 'any@mail.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should create user with valid data', () => {
    const user: User = User.create({ name: 'valid name', email: 'any@mail.com' }).value as User
    expect(user.name.value).toBe('valid name')
    expect(user.email.value).toBe('any@mail.com')
  })
})
