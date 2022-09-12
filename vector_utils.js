const vector_utils = {}

/**
 * 
 * @param {*} c the character to get character code of 
 * @returns {Number} the character code of c
 */
const ord = c => c.charCodeAt(0)

/**
 * 
 * @param  {...number} numbers 
 * @returns {number[]} a "vector"
 */
vector_utils.createVector = (...numbers) => [...numbers]

/**
 * 
 * @param {string} word a string of a word to generate a vector for
 * @returns {number[]} an array of numbers of the char code of each character in the entered word
 */
vector_utils.word2vector = ( word ) => { 
    const chars = word.split("")
    if(chars.length === 0) return []
    console.log(chars)
    return chars.map(c=>ord(c))
}

/**
 * 
 * @param {number[]} v1 a vector  
 * @param {number[]} v2 a vector
 * @returns {{error:string}|{product:number}} error || the dot product of v1 & v2.
 * @about if ||v1|| ≠ ||v2|| returns an error message, otherwise returns a number 
 */
vector_utils.dot = ( v1, v2 ) => {
   let product = 0
   const n=v1.length;
   if(n !== v2.length) return {error: "Vectors of unequal magnitude are invalid"} 
   for(let i = 0; i< n; i++){product+=(v1[i]*v2[i]) }
   return { product: product}
}

vector_utils.magnitude = v=>v.length || v.split("").length || 0 
vector_utils.cosineSimilarity = (x,y) => {
    const nX = vector_utils.magnitude(x)
    const nY = vector_utils.magnitude(y)
    const nDot = Math.max(nX,nY)


    vector_utils.makeUniform([x,y])
    const {product,error} = vector_utils.dot(x,y)
    if(error) return error
    
    return ( product / (nX*nY))

}

/**
 * 
 * @param {Array<number[]>} vectors the vectors to fix lengths
 * @about where a vector is an array of numbers
 * @returns {Array<number[]>} an array of vectors such that all vectors have equal magnitude 
 * 
 */
vector_utils.makeUniform = (vectors) =>{
    const V = [...vectors]
    //find max magintude
    let max = 0
    for( const vector of V ){
        let magnitudeV = vector_utils.magnitude(vector)
        if ( max < magnitudeV ){max = magnitudeV}
        console.log(`||${vector}|| =${magnitudeV}`)
    }
    for( const vector of vectors){ 
        while(vector.length < max){
            vector.push(0)
        }
    }
    return V
}




export default vector_utils