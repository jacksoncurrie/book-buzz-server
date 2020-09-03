import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.PORT ?? 3000

app.use(cors())

app.get('/', (req, res) => res.send('{"name": "Sam"}'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))