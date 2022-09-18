const arrayx = require("./arrayx")

const graphx = {}

/**
 * @param {any[]|undefined} nodes optinal, the nodes to be included in the graph 
 * @returns {Map<any,any[]>}
 */
graphx.initGraph = (nodes=[])=>{
    const g = new Map()
    for(const node of nodes){
        g.set(node,[])
    }
    return g
}


const Edge = ( to , w ) => ({to,w}) 

/**
 * 
 * @param {Map<any,any[]>} g the graph to insert the node into
 * @param {any} src source node 
 * @param {any} dst the destination node
 * @param {number} w weight of edge from src -> dst
 * @param {boolean} directed is the edge directed or bidirectional
 * @returns {any|{error:string}} the added edge or an error message
 */
graphx.addEdge=(g, src,dst,w=1, directed=false)=>{
    if(!g.has(src) || !g.has(dst)) return {error: "Invalid nodes not found in graph"}
    g.get(src).push(Edge(dst,w))
    if(!directed){
        return g.get(dst).push(Edge(src,w))
    }
}

/**
 * 
 * @param {Map<any,any[]>} g the graph to insert the node into
 * @param {any} n the node to insert
 * @returns 
 */
graphx.addNode = (g,n) => {   
    if(g.has(n)) return {error: "Invalid node, already exists in g"}
    else g.set(n,[])
}
/**
 * 
 * @param {Map<any,any[]>} g the orignal graph 
 * @returns the transpose of g
 */
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
/**
 * 
 * @param {Map<any,any[]>} g the graph to remove the node from 
 * @param {any} n the node to remove
 * @returns 
 */
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
/**
 * 
 * @param {*} g the graph to remove the edge from
 * @param {*} src the src node of the edge
 * @param {*} dst the dst node of the edge
 * @param {boolean} directed is the edge directed
 * @returns {{success:string}|{error:string}} a success or error message
 */
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

/**
 * 
 * @param {Map<any,any[]>} g the graph to perform a dfs on
 * @param {any} node the node visiting 
 * @param {any[]} visited the visited nodes 
 * @param {number[]} costs the costs of each traversal
 * @returns {{visited:any[],costs:number[]}} the nodes visited and the costs of each traversal
 */
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

/**
 * 
 * @param {Map<any,any[]>} g the graph to search
 * @param {any} node the origin node
 * @returns the visited nodes
 */
graphx.bfs = ( g, node) => {
    const visited = [node]
    const q = [node]
    const costs = []
    while(q.length){
        const v = q.shift()

        const neighbors = g.get(v)
        neighbors.forEach(neighbor => { 
            if(!visited.includes(neighbor.to)){
                visited.push(neighbor.to)
                costs.push(neighbor.w)
                q.push(neighbor.to)
            }
        })
    }
    return {visited,costs}

}


graphx.toMatrix = (g) => { 
    const V = [...g.keys()], n = V.length;
    console.log(V)
    let currentNeighbors = []
    let matrix = Array(n).fill(Array(n).fill(0))
    for(let i = 0; i < n; i++){
        let v = g.get(V[i])
        if(g.has(v)){ currentNeighbors = g.get(v).map(e=>e.to)
        } else { currentNeighbors = []}
        for(let j = 0; j < n ; j++){
            let u = (V[j])
            if(currentNeighbors.includes(u)){
                matrix[i][j] = 1
            }
        }
    }
    return matrix
}


function driver(){
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
    



}


module.exports = graphx

