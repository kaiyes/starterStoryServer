import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import jwt from 'jsonwebtoken'

import typeDefs from './typeDefs.js'
import resolvers from './resolvers/index.js'
import './config/db.js'

import 'dotenv/config'

const app = express()
app.set('port', process.env.PORT)

app.use(async (req, res, next) => {
  const token = req.headers.authorization
  try {
    const auth = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { _id: auth._id }
  } catch (e) {
    req.user = { _id: null }
  }
  next()
})

const context = async ({ req }) => {
  let user = req.user
  return user
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true
})

server.applyMiddleware({ app })

app.listen(process.env.PORT || 3000, () => console.log('connected to server'))
