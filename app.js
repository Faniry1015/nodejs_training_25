import { createReadStream, createWriteStream } from 'fs';
import { createServer } from 'http';
import { json, text } from 'stream/consumers';
import { deleteTodo, getTodos, postTodo, putTodo } from './functions/api.js';

const server = createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const todos = createReadStream('./data/todos.json');
  const todosObj = await json(await text(todos));
  const reqMethod = req.method;
  const myURL = new URL(req.url, `http://${req.headers.host}`);
  const id = myURL.searchParams.get('id');
  if (url.pathname === '/todos') {
    // Switch case
    switch (reqMethod) {
      case 'GET':
        getTodos(res, todosObj);
        break;
      case 'POST':
        await postTodo(req, res, todosObj);
        break;
      case 'DELETE':
        deleteTodo(res, todosObj, id);
        break;
      case 'PUT':
        putTodo(req, res, todosObj, id);
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' });
    }
  }
  res.end();
});

server.listen(8888, () => {
  console.log('Server listening on port 8888');
});
