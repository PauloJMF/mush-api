import { Application } from './application'
import { ExpressServer } from './application/server/ExpressServer'
import { router } from './application/router/Router'
const server = new ExpressServer()
new Application(server, router, 3000).start().then(() => {
  console.log('Application started')
})
