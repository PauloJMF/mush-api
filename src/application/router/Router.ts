import { Request, Response, Router } from 'express'

const router = Router()

router.get('/health-check', (_: Request, res: Response) => {
  res.json({
    status: 'OK'
  })
})

export { router }
