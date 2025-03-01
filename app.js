import { createServer } from "http";

createServer((req, res) => {
  res.write("Hello World from Node.js");
  console.log('bonjour app')
  res.end();
}).listen(8888);