import { Server } from './server/Server'
import { router } from './router/Router'

class Application {
  private readonly port: number
  private server: Server

  constructor (server: Server, Router: any, port: number) {
    this.server = server
    this.port = port
  }

  public async start () {
    await this.server.start(this.port, router)
  }
}

export { Application }
