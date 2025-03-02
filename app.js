import { createReadStream, createWriteStream } from 'fs';
import { writeFile } from 'fs/promises';
import { createServer } from 'http';
import { json, text } from 'stream/consumers';

const server = createServer(async (req, res) => {
  const todos = createReadStream('./data/todos.json');
  const todosObj = await json(await text(todos));
  const reqMethod = req.method;

  if (reqMethod === 'GET') {
    res.write(JSON.stringify(todosObj));
  } else if (reqMethod === 'POST') {
    const body = await json(req);
    const updatedTodo = {
      id: todosObj.length + 1,
      ...body,
      completed: false,
    };
    const updatedTodos = todosObj.push(updatedTodo);
    await writeFile('./data/todos.json', JSON.stringify(updatedTodos));
  }

  res.end();
});

server.listen(8888, () => {
  console.log('Server listening on port 8888');
});
