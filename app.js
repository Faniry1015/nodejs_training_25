import { createReadStream, createWriteStream } from 'fs';
import { createServer } from 'http';
import { json, text } from 'stream/consumers';

const server = createServer(async (req, res) => {
  const todos = createReadStream('./data/todos.json');
  // const todosWrite = createWriteStream('./data/todos.json');
  const todosJson = await json(await text(todos));
  const reqMethod = req.method;

  if (reqMethod === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(todosJson));
  } else if (reqMethod === 'POST') {
    const body = await json(req);
    const updatedTodo = {
      id: todosJson.length + 1, ...body, completed: false
    };
    res.write(JSON.stringify(updatedTodo))
  }

  res.end();
});

server.listen(8888, () => {
  console.log('Server listening on port 8888');
});
