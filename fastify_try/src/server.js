import fastify from 'fastify';
import fastifyView from '@fastify/view';
import ejs from 'ejs';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = fastify();

const root_dir = dirname(dirname(fileURLToPath(import.meta.url)))

app.register(fastifyView, {
  engine: {
    ejs,
  },  
});

app.register(fastifyStatic, {
  root: join(root_dir, 'public'),
})

app.get('/', async (req, res) => {
  return res.view('templates/index.ejs');
});

const start = async () => {
  try {
    app.listen({ port: 3000 });
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};

start();
