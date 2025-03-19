import fastifyView from '@fastify/view';
import fastify from 'fastify';
import ejs from 'ejs';
import fastifyStatic from '@fastify/static';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { create_post, list_posts, show_article } from './actions/posts.js';
import { record_not_found_error } from './errors/record_not_found_error.js';
import fastifyFormbody from '@fastify/formbody';

const app = fastify();

const root_dir = dirname(dirname(fileURLToPath(import.meta.url)));

app.get('/', list_posts);

app.get('/articles/:id', show_article);

app.post('/', create_post);

app.setErrorHandler((error, req, res) => {
  const id = req.params.id;
  if (error instanceof record_not_found_error) {
    res.statusCode = 404;
    return res.view('templates/404.ejs', { id, pageTitle: 'Page not found' });
  }
  console.error(error)
  res.statusCode = 500;
  return {
    error: error.message,
  };
});

app.register(fastifyView, {
  engine: {
    ejs,
  },
});

app.register(fastifyStatic, {
  root: join(root_dir, 'public'),
});

app.register(fastifyFormbody);

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
