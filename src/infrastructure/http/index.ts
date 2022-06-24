import 'reflect-metadata'
import express from 'express'
import { router } from './routers'
import { ApplicationConfig } from '../../shared/config/application.config'

const app = express()

app.use(router)

app.listen(ApplicationConfig.port, () => {
  console.log('Application started on port:', ApplicationConfig.port)
})
