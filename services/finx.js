// const fetch = require("node-fetch")
const arrayx = require("./arrayx")
const Alpaca = require("@alpacahq/alpaca-trade-api")
const axios = require('axios')
const { getMultiBarsAsync } = require("@alpacahq/alpaca-trade-api/dist/resources/datav2/rest_v2")
const { NewTimeframe, TimeFrameUnit } = require("@alpacahq/alpaca-trade-api/dist/resources/datav2/entityv2")
const finx  = {} 


const POLYGON_DAILY_OPEN_CLOSE = async (symbol,date,adjusted='true')=>{
    console.log(symbol,date,adjusted)
    try {
        const response = await axios.get(
            `https://api.polygon.io/v1/open-close/${symbol}/${date}?adjusted=${adjusted}&apiKey=${POLYGON_API_KEY}`
        )

        console.log(response.data)

    } catch (e) {
        console.log(e)
    }
}
const POLYGON_INTERVAL_OPEN_CLOSE = async ( symbol , from , to , sort , limit=100) => { 
    try {
        const response = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${from}/${to}?adjusted=true&sort=${sort}&limit=${limit}&apiKey=${POLYGON_API_KEY}`
        )


        const formatted = response.data?.results?.map(t=>({open:t.o, close: t.c, on: t.t}))
        return formatted



    } catch (e) {
        console.log(e)
    }
}
const DAY_IN_MS = 1000 * 60 * 60  * 24 
const POLYGON_DELAY = 1000 * 60
const POLYGON_API_KEY = "RKDjiKtc5oVHyjiFjMp8Wl4D_sfSyn2b"


const ALPACA_KEY = "AKNS45EWB1QKRFS1OAVC"
,ALPACA_PAPER="PK4PCY3OMU0AKY6TUPEE"
const ALPACA_SECRET = "IJV7pWpVxBzkHS9XjlL47GxemqCOoYrcATLkwimz" 
,PAPER_SECRET="l08MP6ktAVPojLvmjrZ1kO8zxC4z9xSIVG0Mnmyl"
const ALPACA_CONFIG = { 
    keyId: ALPACA_PAPER,
    secretKey:PAPER_SECRET,
    paper: true
}


const alpaca = new Alpaca(ALPACA_CONFIG)
finx.placeOrder = async (stocks) => { 

    const account = await alpaca.getAccount()
    console.log(`💪 Account Balance: ${account.buying_power}`)

    // for( let i = 0; i < stocks.length; i++ ){
    //     const order = await alpaca.createOrder({
    //         symbol: stocks[i].symbol,
    //         qty: stocks[i].quantity,
    //         side: "buy",
    //         type: "market",
    //         time_in_force: "day"
    //     });
    // }

}


/**
 * 
 * @param {*} symbol  the symbol to search for
 * @param {*} start start date of interval data
 * @param {*} end end date of interval data
 * @param  {...string} fields which fields should be returned 
 * @about FIELDS => valid fields include: Timestamp, OpenPrice, ClosePrice, HighPrice, VWAP, LowPrice, Volume, TradeCount, 
 * @returns 
 */
finx.getStockData = async (symbol, start, end, ...fields) => {
    const bars = await alpaca.getBarsV2(symbol, {
        start: start, end: end, 
        timeframe: NewTimeframe(1,TimeFrameUnit.DAY),
        limit: 100
    })
    const got = []
    for await (let b of bars){
        got.push(b)
    }
  
    return got.map( bar => {
        if( !fields ) return bar
        const response = {}
        fields.forEach(field=>response[field] = bar[field])

        return response
    })
        

}


//helper function 
function getFormattedString(timestamp){
    const startDate = new Date(timestamp)
    const [y,m,d]= [
        String(startDate.getFullYear()), String(startDate.getMonth()+1).padStart(2,"0"), String(startDate.getDate()-1||1).padStart(2,"0")
    ]
    return [y,m,d].join("-")
}

finx.openClose = async (symbol, from , to ,sort="asc", limit=100)=>{
    const data = await POLYGON_INTERVAL_OPEN_CLOSE(symbol,from,to,sort,limit)
    return data
}


const HOUR_MS = 60*60*1000

finx.compareStocks = async (n,...symbols)=>{
    //get interval data for each symbol
    const FIELDS = ["OpenPrice", "ClosePrice","Timestamp","VWAP"]
    const now = Date.now() 
    const endInterval = new Date().getTime() - (2 * HOUR_MS)
    const startInterval = (endInterval) - ( DAY_IN_MS * n)
    
    const start = getFormattedString(startInterval)
    const end = getFormattedString(now)

    console.log(end)
    const symbolMap = new Map()

    for( let i = 0; i < symbols.length; i++ ){
        const data = await finx.getStockData(symbols[i],start,end,...FIELDS)
        const h = data.sort((a,b)=>new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime())

        const latestTradePrice = await finx.latestPrice(symbols[i])
        symbolMap.set(symbols[i], {history: h, current: latestTradePrice});
    }
    

    return symbolMap
}
    

finx.simpleMoving = (history) => { 
    let simples = history.map(n=>n.close)
    return arrayx.sum(simples) / history.length
}

finx.weightedMoving = ( history ) => { 
    //sort by timestamps

    const N = history.length

    let numerator = 0
    for(let i = 0; i < N; i++) {
        let pWeight = ( i + 1)
        
        numerator += (history[i].ClosePrice * pWeight);
    }
    let denominator = ((N*N + N)/2)


    return Number(numerator / denominator);


} 

finx.latestPrice = async (symbol)=>{
    const trade = await alpaca.getLatestTrade(symbol)
    return trade.Price
}

async function shouldSell(data,symbol,WMA){
    return { ok: false, confidence: 0}

}
const MIN_BALANCE = 2
async function shouldBuy(data, symbol,WMA){
    const {current, history} = data
    let confidence = 0;

    const past = [...history].slice(0,history.length-2)
    for(let i = 0; i < past.length; i++){
        const w = ((i+1)/past.length)
        if(past[i].ClosePrice < past[i].VWAP){
            confidence -= w * 0.1
        }
        if(past[i].ClosePrice > past[i].VWAP){
            confidence += w * 0.1
        }
        if(past[i].ClosePrice < WMA ){
            confidence -= w * 0.1
        }
        if(past[i].ClosePrice > WMA ){
            confidence += w * 0.1
        }
    }   


     



    const account = await alpaca.getAccount()
    const latestBar = history.at(-1)
    const latestTrade= await alpaca.getLatestTrade(symbol)

    if(latestTrade.Price < latestBar.VWAP && latestTrade.Price < WMA){
        confidence += 0.4
    }
    if( latestTrade.Price < 0.1 * account.buying_power){
        confidence += 0.4
    }

    if( account.buying_power-latestTrade.Price < MIN_BALANCE){
        confidence = 0  
    }


    if(confidence > 0.7){ 
        let availableBalance = 0.4 * account.buying_power
        let qty =0

        while(availableBalance > MIN_BALANCE){
            qty++
            availableBalance -= latestTrade.Price
        }
        return {ok: true, confidence: confidence.toFixed(2), qty: qty} 
    } else { return {ok: false, confidence: confidence.toFixed(2)} }



}

async function test(){
    try {

        const r = await finx.compareStocks(30,"aapl","goog","msft","cei","cron")

        r.forEach( async (data,symbol)=>{
            const WMA = finx.weightedMoving(data.history)
            console.log(`|${symbol}|`.padEnd(50,"_"))
            console.log(`Current Price: ${data.current}`)
            console.log(`WMA: ${WMA}`)
            const placeBuyOrder = await shouldBuy(data,symbol,WMA)
            const placeSellOrder = await shouldSell(data,symbol,WMA)
            if(placeBuyOrder.ok) {
                console.log("Buy: ", symbol + "x " + placeBuyOrder.qty + "[ " + placeBuyOrder.confidence + " ] ")
            } 
            if( placeSellOrder.ok ) { 
                console.log("Sell: ", symbol + " [ " + placeSellOrder.confidence || "nil" + " ] " )
            }
            if( !placeBuyOrder && !placeSellOrder){
                console.log("Leave it alone: ", symbol)
            }

        })
    } catch (error) {
        console.log(error)
    }
}
test()
