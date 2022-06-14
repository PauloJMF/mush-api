import express, { Express, IRouter } from 'express'
import { Server } from './Server'

class ExpressServer implements Server {
  readonly instance: Express

  constructor () {
    this.instance = express()
  }

  async start (port: number, router: IRouter): Promise<void> {
    this.instance.use(router)
    await this.instance.listen(port)
    console.log(`Server is running on port ${port}`)
  }
}

export { ExpressServer }
