import fastifyView from "@fastify/view"
import fastify from "fastify"
import ejs from 'ejs'

const app = fastify()

app.register(fastifyView, {
    engine: {
        ejs
    }
})

app.get('/', (req, res) => {
    const posts = [
        {
        title: 'Mon premier post',
        body: 'Le body de mon article'
    }, {
        title: 'Mon deuxième article',
        body: 'Le body de mon deuxième post'
    }
]
    res.view('templates/index.ejs', {
        posts, pageTitle: 'Apprendre Fastify'
    })
})

const start = async () => {
    try {
        await app.listen({port: 3000})
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

start()