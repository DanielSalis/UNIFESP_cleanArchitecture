import { UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-maling-list'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { badRequest, created } from '@/web-controllers/util'

export class RegisterUserController {
    private readonly usecase: RegisterUserOnMailingList

    constructor (usecase: RegisterUserOnMailingList) {
      this.usecase = usecase
    }

    public async handle (request: HttpRequest): Promise<HttpResponse> {
      const userData: UserData = request.body
      const response = await this.usecase.registerUserOnMainlingList(userData)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      if (response.isRight()) {
        return created(response.value)
      }
    }
}
