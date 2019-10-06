// tslint:disable-next-line: no-var-requires
require('dotenv').config()
import bodyParser from 'body-parser'
import "colors"
import express from 'express'
import next from 'next'
import { parse } from 'url'
import { connectDB } from './db'

const dev: boolean = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port: string | number = process.env.PORT || 3000

app.prepare().then(async () => {

  connectDB()
  const server = express()
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))

  server.get('*', (req, res) => {
    const parseUrl = parse(req.url, true)
    handle(req, res, parseUrl)
  })

  server.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`Server is listening on ${port}`.bgGreen)
  })
})
