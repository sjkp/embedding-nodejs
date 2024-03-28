/**
             * Returns chunks of size n.
             * @param {Array<any>} array any array
             * @param {number} n size of chunk 
             */
export function* chunks(array, n){
    for(let i = 0; i < array.length; i += n) yield array.slice(i, i + n);
}

export function cosineSimilarity(a: number[], b: number[]): number {
    let dotProduct = a.reduce((sum, x, i) => sum + x * b[i], 0);
    let magnitudeA = Math.sqrt(a.reduce((sum, x) => sum + x * x, 0));
    let magnitudeB = Math.sqrt(b.reduce((sum, x) => sum + x * x, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}


export function unpackStruct(data: ArrayBuffer): number[] {
    let dataView = new DataView(data);
    let values: number[] = [];
    let offset = 0;
    for (let i = 0; i < data.byteLength/4; i++) {
        values.push(dataView.getFloat32(offset, true));
        offset += 4;
    }
    return values;
}