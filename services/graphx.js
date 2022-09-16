const arrayx = require("./arrayx")

const graphx = {}

graphx.initGraph = (nodes=[])=>{
    const g = new Map()
    for(const node of nodes){
        g.set(node,[])
    }
    return g
}


const Edge = ( to , w ) => ({to,w}) 
graphx.addEdge=(g, src,dst,w=1, directed=false)=>{
    if(!g.has(src) || !g.has(dst)) return {error: "Invalid nodes not found in graph"}
    g.get(src).push(Edge(dst,w))
    if(!directed){
        g.get(dst).push(Edge(src,w))
    }
}

graphx.addNode = (g,n) => { 
    if(g.has(n)) return {error: "Invalid node, already exists in g"}
    else g.set(n,[])
}

graphx.transpose = (g)=>{
    const t = new Map()
    g.forEach((neighbors,node)=>{
        neighbors.forEach((neighbor)=>{
            if(!t.has(neighbor.to)) {
                t.set(neighbor.to, [{to:node,w:neighbor.w}])
            } else {
                t.get(neighbor.to).push({to:node,w:neighbor.w})
            }

        })
    })
    console.log(t)
    return t

}


graphx.removeNode = ( g, n ) => { 
    if(!g.has(n)) return {error: "Node not present in graph"}
    g.forEach(( neighbors , node ) => { 
        const hasNeighbor = neighbors.indexOf(n)
        console.log(`${node} neighbors ${n}? ${hasNeighbor}`)
        if(hasNeighbor > -1 ) { 
            g.set(n, neighbors.splice(hasNeighbor,1))
        }
    })
}

graphx.removeEdge = ( g , src, dst, directed=false ) => { 
    if(!g.has(src) || !g.has(dst)) return {error: "Invalid source or destination node. Reason: Not in graph"}
    const neighborsSrc = g.get(src), neighborsDst = g.get(dst)

    
    const dstIndex = neighborsSrc.indexOf(dst)
    if(dstIndex > -1) {
        g.set(src, neighborsSrc.splice(dstIndex,1))
    } else { 
        return { error: "No edge exists from " + src + " to " + dst + "." }
    }
    if(!directed) {

        const srcIndex = neighborsDst.indexOf(src)
        if(srcIndex > -1) { 
            g.set(src,neighborsDst.splice(srcIndex, 1)) //
        } else { 
            return {error: "No edge exists from " + dst + " to " + src + "."}
        }
        
    }

    return { success: "Removed edge from " + src + " to " + dst + "." }

} 

graphx.dfs = (g,node, visited=[], costs=[]) => { 
    // console.log(visited)
    
    visited.push(node)
    for( const neighbor of g.get(node)){
        const { to , w} = neighbor
        if(!visited.includes(to)){
            costs.push(w)
            graphx.dfs(g,to,visited,costs)
        }
    }
    return {visited,costs}
}

graphx.bfs = ( g, node) => {
    const visited = [node]
    const q = [node]
    while(q.length){
        const v = q.shift()

        const neighbors = g.get(v).map(e=>e.to)
        neighbors.forEach(neighbor => { 
            if(!visited.includes(neighbor)){
                visited.push(neighbor)
                q.push(neighbor)
            }
        })
    }
    return visited

}





const myGraph = graphx.initGraph()
const $add = graphx.addNode 
const $edge = graphx.addEdge

$add(myGraph, "A")
$add(myGraph, "B")
$add(myGraph, "C")
$add(myGraph, "D")

$edge(myGraph,"A","B",1,true)
$edge(myGraph,"B","C",1,true)
$edge(myGraph,"C","D",1,true)
$edge(myGraph,"D","A",1,true)
$edge(myGraph,"D","B",1,true)


console.log(myGraph)

console.log(graphx.isCyclic(myGraph,"A"))
graphx.transpose(myGraph)