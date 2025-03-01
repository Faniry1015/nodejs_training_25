import { createServer } from "node:http";
import { json, text } from "node:stream/consumers";

//http serveur simple avec stream récuperer le corps de la requête et l'afficher avec text et json
const server = createServer(async (req, res) => {
   const body = await json(await text(req))
   res.write(`Hello ${body.name}`);
   res.end()
});

server.listen("8888");