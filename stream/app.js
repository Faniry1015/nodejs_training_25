import { createReadStream, createWriteStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";

const video = await readFile('video.mp4');
const { size } = await stat('video.mp4');
const stream = createReadStream('video.mp4');
const writeStream = createWriteStream('video-copy.mp4');
let currentSize = 0;

stream.on('data', (chunk) => {
  currentSize += chunk.byteLength;
  console.log(`Progress: ${(100 * currentSize / size).toFixed(2)}%`);
});

stream.pipe(writeStream);