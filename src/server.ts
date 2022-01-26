import express from 'express'
import 'express-async-errors'
import 'dotenv/config'

const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
