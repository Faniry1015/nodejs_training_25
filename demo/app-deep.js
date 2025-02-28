import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFile } from "node:fs/promises";

//trouver le chemin du fichier en utilisant le module path, fichiers en profondeurs

const dir = dirname(fileURLToPath(import.meta.url))
const filename = join(dir, 'text-deep.txt')

console.log(await readFile(filename, {encoding: 'utf-8'}))

