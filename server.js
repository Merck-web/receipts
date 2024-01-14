const path = require('path')
const env = require('dotenv').config()
const autoload = require('@fastify/autoload')
const cors = require('@fastify/cors')
const fastify = require('fastify')({
  logger: true
})

fastify.register(cors, { 
  
})

fastify.register(autoload, {
  dir: path.join(__dirname, 'routes'),
  options: Object.assign({prefix: '/api'})
})

fastify.listen({ port: process.env.H_PORT}, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
})