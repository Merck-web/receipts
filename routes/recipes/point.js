const job = require('../../handlers/handler')

module.exports = function (fastify, opts, next) {
    fastify.route({
        method: 'POST',
        url: '/show',
        schema: {
            body: {
                type: 'object',
                properties: {
                    category: { type: 'integer' },
                }
            },
            response: {
                400: {
                    type:       'object',
                    properties: {
                        message:    { type: 'string' },
                        statusCode: { type: 'integer' },
                    },
                },
            }
        },
        async handler(request, reply) {
            let data = await job.showRecipes(request.body)
            if (data.statusCode !== 200) {
                reply.status(400)
            }

            reply.send(data)
        }
    })

    fastify.route({
        method: 'POST',
        url: '/addRecipe',
        schema: {
            body: {
                type: 'object',
                properties: {
                    name:             { type: 'string' },
                    categoryId:       { type: 'integer' },
                    shortDescription: { type: 'string' },
                    fullDescription:  { type: 'string' },
                },
                required: [ 'name', 'categoryId', 'shortDescription', 'fullDescription' ],
            },
            response: {
                400: {
                    type:       'object',
                    properties: {
                        message:    { type: 'string' },
                        statusCode: { type: 'integer' },
                    },
                },
            }
        },
        async handler(request, reply) {
            let data = await job.addRecipe(request.body)
            if (data.statusCode !== 200) {
                reply.status(400)
            }

            reply.send(data)
        }
    })

    fastify.route({
        method: 'POST',
        url: '/showRecipe',
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                }
            },
            response: {
                400: {
                    type:       'object',
                    properties: {
                        message:    { type: 'string' },
                        statusCode: { type: 'integer' },
                    },
                },
            }
        },
        async handler(request, reply) {
            let data = await job.showRecipe(request.body)
            if (data.statusCode !== 200) {
                reply.status(400)
            }

            reply.send(data)
        }
    })

    fastify.route({
        method: 'POST',
        url: '/updateRecipe',
        schema: {
            body: {
                type: 'object',
                properties: {
                    id:         { type: 'integer' },
                    name:             { type: 'string' },
                    categoryId:       { type: 'integer' },
                    shortDescription: { type: 'string' },
                    fullDescription:  { type: 'string' },
                },
                required: [ 'name', 'categoryId', 'shortDescription', 'fullDescription' ],
            },
            response: {
                400: {
                    type:       'object',
                    properties: {
                        message:    { type: 'string' },
                        statusCode: { type: 'integer' },
                    },
                },
            }
        },
        async handler(request, reply) {
            let data = await job.updateRecipe(request.body)
            if (data.statusCode !== 200) {
                reply.status(400)
            }

            reply.send(data)
        }
    })

    fastify.route({
        method: 'POST',
        url: '/deleteRecipe',
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                }
            },
            response: {
                400: {
                    type:       'object',
                    properties: {
                        message:    { type: 'string' },
                        statusCode: { type: 'integer' },
                    },
                },
            }
        },
        async handler(request, reply) {
            let data = await job.deleteRecipe(request.body)
            if (data.statusCode !== 200) {
                reply.status(400)
            }

            reply.send(data)
        }
    })

    next();
};