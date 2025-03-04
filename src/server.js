import fastifyView from "@fastify/view"
import fastify from "fastify"
import ejs from 'ejs'
import fastifyStatic from '@fastify/static'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const app = fastify()

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
console.log(rootDir)

app.register(fastifyView, {
    engine: {
        ejs
    }
})

app.register(fastifyStatic, {
    root: join(rootDir, 'public'),
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
        console.log('Server is running on http://localhost:3000')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

start()