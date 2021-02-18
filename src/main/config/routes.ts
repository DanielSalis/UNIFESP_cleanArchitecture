import { Express, Router } from 'express'
import { readdirSync } from 'fs'

/* eslint-disable node/no-path-concat */
export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(`${__dirname}/routes`).map(async file => {
    (await import(`${__dirname}/routes/${file}`)).default(router)
  })
}
