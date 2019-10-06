/* eslint-disable no-console */
require('dotenv').config()
import express from 'express'
import next from 'next'
import bodyParser from 'body-parser'
import { connectDB } from './db'
import { parse } from 'url'
import "colors"

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

app.prepare().then(async () => {

  connectDB()
  const server = express()
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))

  server.get('*', (req, res) => {
    const parseUrl = parse(req.url, true)
    handle(req, res, parseUrl)
  })

  server.listen(port, err => {
    if (err) throw err
    else console.log(`Server is listening on ${port}`.bgGreen)
  })
})
