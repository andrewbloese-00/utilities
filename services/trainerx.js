const stringx = require("./stringx")
const vectorx = require("./vectorx")
const trainerx = {}


trainerx.encodeData = ( training_data, doEncodeOutput=false ) => { 
    const batch = []
    training_data.forEach( ({input , output }) => {
        console.log("input: " + input) 
        const encodedInput = vectorx.word2vector((input))
        ,encodedOutput = doEncodeOutput ? vectorx.word2vector(output) : output
        batch.push({input:encodedInput, output:encodedOutput})
    })

    let mI= 0, mO;
    if(doEncodeOutput){
        batch.forEach(entry=>{
            if(entry.output.length > mO){ mO = entry.output.length}
        })
    }    
    batch.forEach((entry)=>{
        if(entry.input.length > mI) { mI = entry.input.length}
    })

    batch.forEach((entry)=>{
        while(entry.input.length < mI){
            entry.input.push(0)
        }
        if(doEncodeOutput){
            while(entry.output.length < mO){
                entry.output.push(0)
            }
        }

    });
    return batch

}

trainerx.decodeData = ( encoded ,encodedOutput=false)=>{
    const decoded = []
    encoded.forEach(encodedDataPoint=>{
        const decodedInput = stringx.vec2word(encodedDataPoint.input.filter(i=>i!==0)),
        decodedOutput = encodedOutput ? stringx.vec2word(encodedDataPoint.output) : encodedDataPoint.output
        decoded.push({
            input: decodedInput,
            output: decodedOutput,
        })
    })
    return decoded
}



const t_data = [{
    input: "Hello neighbor",
    output: "(Response) Hello"
}, {
    input: "Goodbye neighbor",
    output: "(Response) Farewell!"
} ]


console.log((trainerx.encodeData(t_data,false)))

module.exports = trainerx