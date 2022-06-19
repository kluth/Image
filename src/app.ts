import express, { Application } from 'express'
import router from './routes/image'
const app: Application = express()

app.use('/images', router)

export default app