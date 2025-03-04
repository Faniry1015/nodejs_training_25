import fastifyView from "@fastify/view"
import fastify from "fastify"
import ejs from 'ejs'

const app = fastify()

app.register(fastifyView, {
    engine: {
        ejs
    }
})

app.get('/', async (req, res) => {
    res.view('templates/index.ejs')
})

const start = async () => {
    try {
        await app.listen({port: 3000})
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()