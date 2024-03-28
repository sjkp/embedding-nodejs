import Database from 'better-sqlite3';
import { cosineSimilarity, unpackStruct } from './utils';
import fssync from 'fs';

const file = fssync.readFileSync('blog.db');

const db = new Database(file, {});

let dbperf = performance.now();
var data = db.prepare('SELECT * from embeddings').all();
console.log('access database', performance.now()-dbperf);

let mostsimilar = data.map((a) =>{
    return {id: a.id, score: cosineSimilarity(unpackStruct(data[5].embedding.buffer),unpackStruct(a.embedding.buffer))};
});
let start = performance.now()
console.log(mostsimilar.sort((a, b)=> {
    return b.score-a.score;
}).splice(0,10));

console.log('calculate cosine', performance.now()-start);