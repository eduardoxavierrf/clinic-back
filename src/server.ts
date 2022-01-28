import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import 'reflect-metadata'
import 'dotenv/config'
import AppError from './shared/error/AppError'
import './shared/database'
import router from './shared/routes'

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(router)
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.status).json({
        message: err.message
      })
    }
    return response.status(500).json({
      message: 'Internal server error'
    })
  }
)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
