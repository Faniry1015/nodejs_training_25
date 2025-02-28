import { watch, watchFile } from 'node:fs'
import {copyFile, readFile, writeFile, unlink, stat, open} from 'node:fs/promises'


//Ecriture de fichier
await writeFile('texte.txt', ' Ajout de contenu', {flag: 'a'}) //flag a = append si non écrase

//Lecture de fichier
const content = await Promise.all([
    readFile('texte.txt', {encoding: 'utf-8'}), 
    readFile('texte.txt', {encoding: 'utf-8'})
])

//Copie de fichier
await copyFile('texte.txt', 'texte_copie.txt')


//Supprimer un fichier
await unlink('texte_copie.txt')

//Info sur fichier
const stats = await stat('texte.txt')
console.log(stats)
console.log(content)

//Ouvrir le fichier
const file = await open('texte.txt', 'a')
file.write('Add file content 2')
file.close

// // watcher pour suivrer les changements dans un path
const watcher = watchFile('./')

for await (const event of watcher) {
    console.log(event)
}