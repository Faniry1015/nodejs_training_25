import {
  copyFile,
  readFile,
  writeFile,
  unlink,
  stat,
  open,
  readdir,
  watch,
} from "node:fs/promises";
import path, { join } from "node:path";

//Ecriture de fichier
await writeFile("texte.txt", " Ajout de contenu", { flag: "a" }); //flag a = append si non écrase

//Lecture de fichier
const content = await Promise.all([
  readFile("texte.txt", { encoding: "utf-8" }),
  readFile("texte.txt", { encoding: "utf-8" }),
]);

//Copie de fichier
await copyFile("texte.txt", "texte_copie.txt");

//Supprimer un fichier
await unlink("texte_copie.txt");

//Info sur fichier
const stats = await stat("texte.txt");
console.log(stats);
console.log(content);

//Ouvrir le fichier
const file = await open("texte.txt", "a");
file.write("Add file content 2");
file.close();

// // watcher pour suivrer les changements dans un dossier
const watcher = watch("./");

// for await (const event of watcher) {
//     console.log(event)
// }

//TP Résumé des fichiers et dossiers qui se trouve dans un répértoire et ces sous dossiers
const filesDetails = async (dir) => {
  const files = await readdir(dir, { withFileTypes: true });
  Promise.all(files.map(async (file) => {
    const filePath = path.join(dir, file.name);
    const isDirectory = file.isDirectory();
    let fileInfo = [isDirectory ? "Dossier" : "Fichier", filePath];
    if (!isDirectory) {
      const { size } = await stat(filePath); // Use filePath instead of file.name
      fileInfo.push(size);
    }
    console.log(fileInfo.join(" - "));

    if (isDirectory) {
      await filesDetails(filePath); // Appel récursif pour explorer les sous-dossiers
    }
  }));
};

filesDetails("./");