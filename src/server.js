import fastifyView from '@fastify/view';
import fastify from 'fastify';
import ejs from 'ejs';
import fastifyStatic from '@fastify/static';
import fastifySecureSession from '@fastify/secure-session';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  create_post,
  delete_post,
  list_posts,
  show_article,
} from './actions/posts.js';
import { record_not_found_error } from './errors/record_not_found_error.js';
import fastifyFormbody from '@fastify/formbody';
import { login_action, logout_action } from './actions/auth.js';
import { readFileSync } from 'node:fs';

const app = fastify();

const root_dir = dirname(dirname(fileURLToPath(import.meta.url)));

app.get('/', list_posts);

app.get('/articles/:id', show_article);

app.post('/', create_post);

app.post('/delete/:id', delete_post);

app.get('/login', login_action);
app.post('/login', login_action);

app.post('/logout', logout_action);

app.setErrorHandler((error, req, res) => {
  const id = req.params.id;
  if (error instanceof record_not_found_error) {
    res.statusCode = 404;
    return res.view('templates/404.ejs', { id, pageTitle: 'Page not found' });
  }
  console.error(error);
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

app.register(fastifySecureSession, {
  cookieName: 'my-session-cookie',
  key: readFileSync(join(root_dir, 'secret-key')),
  expiry: 24 * 60 * 60, // Default 1 day
  cookie: {
    path: '/',
  },
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
