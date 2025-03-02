import { createReadStream, createWriteStream } from 'fs';
import { createServer } from 'http';
import { json, text } from 'stream/consumers';
import { deleteTodo, getTodos, postTodo, putTodo } from './functions/api.js';

const server = createServer(async (req, res) => {
  const todos = createReadStream('./data/todos.json');
  const todosObj = await json(await text(todos));
  const reqMethod = req.method;
  const myURL = new URL(req.url, 'http://localhost:8888');
  const id = myURL.searchParams.get('id');

  if (reqMethod === 'GET') {
    getTodos(res, todosObj);
  } else if (reqMethod === 'POST') {
    await postTodo(req, res, todosObj);
  } else if (reqMethod === 'DELETE') {
    deleteTodo(res, todosObj, id);
  } else if (reqMethod === 'PUT') {
    putTodo(req, res, todosObj, id);
  }

  res.end();
});

server.listen(8888, () => {
  console.log('Server listening on port 8888');
});
