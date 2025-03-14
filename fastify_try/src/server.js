import fastifyView from '@fastify/view';
import fastify from 'fastify';
import ejs from 'ejs';

const app = fastify();

app.get('/', async (req, res) => {
  res.view('templates/index.ejs');
});

app.register(fastifyView, {
  engine: {
    ejs,
  },
});

const start = async () => {
  try {
    app.listen({ port: 3000 });
    console.log('serveur lancé');
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};

start();
