import {copyFile, readFile, writeFile, unlink, stat, open, readdir, watch} from 'node:fs/promises'
import path, { join } from 'node:path'


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
file.close()

// // watcher pour suivrer les changements dans un dossier
const watcher = watch('./')

// for await (const event of watcher) {
//     console.log(event)
// } 

//TP Résumé des fichiers et dossiers qui se trouve dans un répértoire
const files = await readdir('./', {withFileTypes: true })
files.map(async (file) => {
    const isDirectory = file.isDirectory()
    let fileInfo = [
        isDirectory ? 'Dossier' : 'Fichier',
        file.name
    ]
    if (!isDirectory) {
        const {size} = await stat(file.name)
        fileInfo.push(size)
    }
    console.log(fileInfo.join(' - '))
})