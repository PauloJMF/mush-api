import { PrismaClient } from '@prisma/client'
import { Database } from '../index'

class PrismaDatabase implements Database {
  private readonly client: PrismaClient

  constructor () {
    this.client = new PrismaClient()
  }

  connect (): Promise<void> {
    return Promise.resolve(undefined)
  }

  getInstance (): PrismaClient {
    return this.client
  }
}

export { PrismaDatabase }
