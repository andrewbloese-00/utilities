const X = require("./services")



const EMOTIONS = [
    "sexual desire", "aesthetic appreciation", "romance","love","submission","awe","rejection","disapproval","remorse","contempt",
    "ecstacy","joy","trust","respect","fear","surprise","amazement","distraction","sadness","grief","pensiveness","boredom","loathing",
    "rage","annoyance","serenity","admiration","acceptance","apprehension","terror","shame","calmness","anticipation","optimism","anxiety",
    "trauma","agressiveness","interest","vigilance","obsession","curiosity","motivation","passion","understanding","knowledge"
]
const g = X.graph.initGraph(EMOTIONS)
const $e=(src,dst,weight=1,directed=false) => X.graph.addEdge(g,src,dst,weight,directed)

$e("sexual desire","ecstacy",0.25)
$e("sexual desire","love",0.25)
$e("sexual desire","submission",0.25)
$e("sexual desire","aesthetic appreciation",0.25)

$e("aesthetic appreciation", "acceptance",0.5)
$e("aesthetic appreciation", "awe",0.5)

$e("rejection","disapproval",0.5)
$e("rejection","contempt",0.5)

$e("love","joy", 0.5)
$e("love","trust", 0.5)

$e("submission", "fear", 0.5)
$e("submission", "trust", 0.5)

$e("awe","fear", 0.5)
$e("awe","surprise", 0.5)

$e("disapproval","surprise", 0.5)
$e("disapproval","sadness", 0.5)

$e("contempt","disgust",0.5)
$e("contempt","anger",0.5)

$e("joy","ecstacy")
$e("joy","serenity")

$e("trust","admiration")
$e("trust","acceptance")

$e("fear","terror")
$e("fear","apprehension")

$e("surprise","amazement")
$e("surprise","distraction")

$e("sadness","grief")
$e("sadness","pensiveness")

$e("disgust", "boredom")
$e("disgust", "loathing")

$e("anger", "rage")
$e("anger", "annoyance")

$e("anticipation","interest")
$e("anticipation","vigilance")

$e("respect","admiration",0.5)
$e("respect","submission",0.5)

$e("anxiety","apprehension",0.25)
$e("anxiety","trauma",0.25)
$e("anxiety","pensiveness",0.25)
$e("anxiety","shame",0.25)

$e("shame","loathing",0.5)

$e("trauma","grief",0.25)
$e("trauma","terror",0.25)
$e("trauma","rage",0.25)
$e("trauma","shame",0.25)

$e("anticipation","aggressiveness",0.5)
$e("anger","aggressiveness",0.5)

$e("obsession", "curiosity",0.25)
$e("obsession", "aggressiveness",0.25)
$e("obsession", "passion",0.25)
$e("obsession", "sexual desire",0.25)

$e("motivation","passion",0.25)
$e("motivation","curiosity",0.25)
$e("motivation","knowledge",0.25)
$e("motivation","passion",0.25)

$e("remorse","sadness",0.5)
$e("remorse","disgust",0.5)
$e("knowledge","understanding")

const deep = X.graph.dfs(g,"aesthetic appreciation")
console.log(deep.visited)

const matrix = X.graph.toMatrix(g)
console.log(matrix)


console.log([...g.keys()].filter(x=>!deep.visited.includes(x)))
