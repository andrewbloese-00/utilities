const arrayx = require("./arrayx")


const heapx = {}

// helpers for binomial heaps
heapx.binomialHelpers = {
    parent: (i) => Math.floor((i-1)/2),
    left: (i) => Math.floor((2*i)+1),
    right: (i) => Math.floor((2*i)+2),
    getNeighbors: (i)=>{
        return {
            l: heapx.binomialHelpers.left(i),
            r: heapx.binomialHelpers.right(i),
            p: heapx.binomialHelpers.parent(i),
        }
    }

    
}



heapx.minheap = (H) =>({
    insert: (x) => { 

        H.push(x)
        let i = H.length - 1
        const { l , r , p } = heapx.binomialHelpers.getNeighbors(i)
        
        while(i!==0 && H[i] < H[p]){ //maintain the heap property
            arrayx.swap(H,i,p) //swap i and its parent
            i = p; //traverse to parent
        }
        return true
    }, 
    extractMin: ()=>{
        if(H.length  == 0 ) return null
        //swap the min to the rear and pop it
        arrayx.swap(H,0,H.length-1)
        const min = H.pop()
        heapx.minheap.heapify(H)

    },
    heapify: (i) => {
        const { l , r , p } = heapx.binomialHelpers.getNeighbors(i);
        let min = i
        if( l < H.length-1 && H[l] < H[min]){
            min = l
        }
        if( r < H.length-1 && H[r] < H[min]){
            min = l
        }
        if( min != i){
            arrayx.swap(H,i,min)
            heapx.minheap.heapify(min)
        }

    },
    buildHeap: (elems)=>{
        let n = elems.length -1
        for(let i = 0; i < n/2-1; i++){
            heapx.minheap(elems).heapify(i)
        }
        console.log(elems)

    },

    heapsort: () => { 
        let clone = [...H]
        let elems = []
        while(clone.length > 0){

        }

    }

    
    

})

const heap = []
heapx.minheap(heap).insert(1)
console.log(heap)