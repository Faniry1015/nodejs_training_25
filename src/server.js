import fastifyView from '@fastify/view';
import fastify from 'fastify';
import ejs from 'ejs';
import fastifyStatic from '@fastify/static';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './database.js';

const app = fastify();

const root_dir = dirname(dirname(fileURLToPath(import.meta.url)));

app.get('/', (req, res) => {
  const posts = db.prepare('SELECT * FROM posts').all()
  console.log(posts)
  res.view('templates/index.ejs', {
    posts,
    pageTitle: 'Apprendre Fastify from server',
  });
});

app.register(fastifyView, {
  engine: {
    ejs,
  },
});

app.register(fastifyStatic, {
  root: join(root_dir, 'public'),
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
