const string_utils = require('./string_utils')
const arrayx = require('./arrayx')
const vectorx = require('./vectorx')


const andrewVec = vector_utils.word2vector("andrew gets down with the boys")
const akhilVec = vector_utils.word2vector("akhil gets down with his money")

console.log(string_utils.vec2word(andrewVec))
console.log(string_utils.vec2word(akhilVec))
console.log(string_utils.editdistance("andrew","akhil"))

module.exports = {
    vectorx: vectorx,

}


