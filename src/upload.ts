import Database from 'better-sqlite3';
import fssync from 'fs';
import { chunks, unpackStruct } from './utils';

const db = new Database('blog.db', {});
 
let dbperf = performance.now();
var data = db.prepare('SELECT * from embeddings').all();
console.log(performance.now()-dbperf);
//console.log(data[0].embedding.buffer);
//console.log(unpackStruct(data[0].embedding.buffer));




let a = [...chunks(data,64)];


for (let i in a)
{
    console.log(i);
    var data = JSON.stringify(a[i].map(s => {
        return {
            id: s.id.substring(0,Math.min(s.id.length,64)),
            values: unpackStruct(s.embedding.buffer)
        }
    }))

    fssync.writeFileSync(`output${i}.json`, data);
    
    fetch('https://embeddingtest.mail5184.workers.dev/insertraw', { 
        method: 'POST', 
        body: data, 
        headers: { 
            'Content-Type': 'application/json',
            'api-key': 'insert-key'        
        } 
    }).then(response => response.json()).then(data => console.log(data));

   
}


