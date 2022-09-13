const vectorx = {}

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
vectorx.createVector = (...numbers) => [...numbers]

/**
 * 
 * @param {string} word a string of a word to generate a vector for
 * @returns {number[]} an array of numbers of the char code of each character in the entered word
 */
vectorx.word2vector = ( word ) => { 
    const chars = word.split("").map(c=>c.toLowerCase())
    if(chars.length === 0) return []
    return chars.map(c=>ord(c))
}

/**
 * 
 * @param {number[]} v1 a vector  
 * @param {number[]} v2 a vector
 * @returns {{error:string}|{product:number}} error || the dot product of v1 & v2.
 * @about if ||v1|| ≠ ||v2|| returns an error message, otherwise returns a number 
 */
vectorx.dot = ( v1, v2 ) => {
   let product = 0
   const n=v1.length;
   if(n !== v2.length) return {error: "Vectors of unequal magnitude are invalid"} 
   for(let i = 0; i< n; i++){product+=(v1[i]*v2[i]) }
   return { product: product}
}


/* calculates the length of a vector */
vectorx.vectorLength = ( v ) => {
    let m = 0
    v.forEach(component=>{
        m+= Math.pow(component,2)
    })
    return Math.sqrt(m)

}


/**
 * 
 * @param {Array<number[]>} vectors the vectors to fix lengths
 * @about where a vector is an array of numbers
 * @returns {Array<number[]>} an array of vectors such that all vectors have equal magnitude 
 * 
 */
vectorx.makeUniform = (vectors) =>{
    const Vuniform = []
    const largestVector = Math.max(...vectors.map(v=>v.length))
    vectors.forEach(vector=>{
        if(vector.length < largestVector){
            Vuniform.push([...vector, ...Array(largestVector-vector.length).fill(0)])
        } else {
            Vuniform.push(vector)
        }
    })
    return Vuniform
}   


vectorx.editdistanceDP = (v1,v2) => {
    if (v1.length === 0) return v2.length; 
    if (v2.length === 0) return v1.length;
  
    var matrix = [];
    var i,j;
  
    //label columns
    for (i = 0; i <= v2.length; i++) {
      matrix[i] = [i];
    }


    //label rows  
    for (j = 0; j <= v1.length; j++) {
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for (i = 1; i <= v1.length; i++) {
      for (j = 1; j <= v2.length; j++) {
        if (v2[i-1] == v1[j-1]) {
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)); // deletion
        }
      }
    }
  
    console.log(matrix);
    return matrix[v2.length][v1.length]; 

}


vectorx.lev = (v1,v2)=> {
    if(v1.length === 0 ) return v2.length;
    if(v2.length === 0 ) return v2.length;

    let cost = v1[v2.length-1] === v2[v1.length-1] ? 0 : 1
    return Math.min(
        (vectorx.lev(v1.slice(1),v2)+ 1), //delete
        (vectorx.lev(v2.slice(1),v1)+ 1), //insertt
        (vectorx.lev(v1.slice(1),v2.slice(1))+ cost)//sub
    )
}



vectorx.cosineSimilarity = (x,y) => {
    const [xUniform, yUniform] = vectorx.makeUniform([x,y])
    const {product} = vectorx.dot(xUniform, yUniform)
    return (product / (vectorx.vectorLength(x) * vectorx.vectorLength(y)))
}

vectorx.cosineDisimilarity = (x,y)=>{
    return 1-vectorx.cosineSimilarity(x,y)
    
}
module.exports = vectorx

