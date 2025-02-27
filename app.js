import fs from 'fs'

const content = await Promise.all([
    fs.promises.readFile('texte.txt', {encoding: 'utf-8'}), 
    fs.promises.readFile('app.js', {encoding: 'utf-8'})
])

console.log(content)