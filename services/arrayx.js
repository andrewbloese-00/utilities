const SHOW_STEPS = true
const arrayx = {} 

/**
 * 
 * @param {[]} arr the array to split into chunks of "chunkSize" 
 * @param {number} chunkSize  the desired size of each chunk
 * @param {boolean} even true: use "fill" parameter to ensure every chunk is chunksize || false: unequal chunks are left alone
 * @about the even parameter is default to false
 * @param {any} fill default: 0 -> the character to fill empty slots of a chunk with
 * @about the fill parameter is used only when even is set to true
 * @returns 
 */
arrayx.chunk = (arr,chunkSize,even=false,fill=0) => {
    let chunks = []

    for( let i = 0; i < arr.length; i+= chunkSize ){
       chunks.push(arr.slice(i, i+chunkSize));
    }

    const lastChunk = chunks.at(-1)
    if(lastChunk.length !== chunks[0].length){
        if(even){
            while(lastChunk.length !== chunks[0].length){
                lastChunk.push(fill)
            }
        }
    }

    return chunks;

}

/**
 * 
 * @param {number} n the number of elements to select from array 
 * @param {[]} arr the array to pick from 
 * @param {boolean} allowDuplicates - whether or not to allow repeat selections
 * @returns  
 */
arrayx.nRandomElements = ( n , arr , allowDuplicates=true) => {
    const source = [...arr];
    let results = [];
    if(!allowDuplicates)
    if( n - results.length >= source.length){
        console.error("Invalid n. n must be less than length. ")
        return results
    }

    while (source.length > 0 && results.length < n) { 
        let r = Math.floor(Math.random() * (source.length-1))
        results.push(source[r])
        if(allowDuplicates === false){
            source.splice(r,1);
        }
    }

    if( results.length === 1 ){
        return results[0]
    } else { 
        return results;
    }
}

arrayx.nchunks = ( arr , n , even=false) => {
    let chunkSize = Math.floor(arr.length/n)
    return arrayx.chunk(arr,chunkSize,even)
}








module.exports = arrayx
