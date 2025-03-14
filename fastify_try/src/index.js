import Fastify from 'fastify';

const fastify = Fastify();
fastify.post('/',  function (req, res) {
    // const body = req.body()
    const body = req.body
    res.send(body.title)
    })

try {
    await fastify.listen({port: 3000})
    console.log('server running at port 3000')
} catch(err) {
    fastify.log.error(err)
    process.exit(1)
}