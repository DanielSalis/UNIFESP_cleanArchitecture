import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { MongoHelper } from '@/external/repositories/mongodb/helper'
import { UserData } from '@/entities'

export class MongodbUserRepository implements UserRepository {
  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user)
    if (!exists) {
      const userCollection = MongoHelper.getCollection('users')
      await userCollection.insertOne(user)
    }
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const userCollection = MongoHelper.getCollection('users')
    const result = await userCollection.findOne({ email: email })
    return result
  }

  async findAllUsers (): Promise<UserData[]> {
    return (await MongoHelper.getCollection('users').find().toArray())
  }

  async exists (user: UserData): Promise<boolean> {
    const result = await this.findUserByEmail(user.email)
    if (result !== null) {
      return true
    }
    return false
  }
}
