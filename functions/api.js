import { createWriteStream } from "fs";
import { json } from "stream/consumers";

export const getTodos = (res, todosObj) => {
  res.write(JSON.stringify(todosObj));
};

export const postTodo = async (req, res, todosObj) => {
  const body = await json(req);
  const updatedTodo = {
    id: todosObj.length + 1,
    ...body,
    completed: false,
  };
  todosObj.push(updatedTodo);
  const writeStream = createWriteStream('./data/todos.json');
  writeStream.write(JSON.stringify(todosObj));
  res.write(JSON.stringify(todosObj));
};

export const deleteTodo =  (res, todosObj, id) => {
    const updatedTodos = todosObj.filter((todo) => todo.id !== Number(id));
    const writeStream = createWriteStream('./data/todos.json');
    writeStream.write(JSON.stringify(updatedTodos));
    res.write(JSON.stringify(updatedTodos));
};

export const putTodo = async (req, res, todosObj, id) => {
    const body = await json(req);
    const updatedTodos = todosObj.map((todo) => {
      if (todo.id === Number(id)) {
        return {
          ...todo,
          ...body,
        };
      }
      return todo;
    });
    const writeStream = createWriteStream('./data/todos.json');
    writeStream.write(JSON.stringify(updatedTodos));
    res.write(JSON.stringify(updatedTodos));
}
