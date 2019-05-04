class Graph {
    constructor() {
        this.nodes = []
        this.edges = []
        this.nvPairs = []
    }
    add(n) {
        this.nodes.push(n)
    }
    addEdge(n) {
        this.edges.push(n)
    }
    addNVPair(n) {
        this.nvPairs.push(n)
    } 
    findNode(p) {
        //ADD LOGIC TO FIND NV PAIR
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            const n = this.nodes[i]
            if (n.contains(p)) return n
        }
        return undefined
    }
 
    draw() {
        clearCanvas()
        for (const m of this.edges) {
            m.draw()
        }
        for (const n of this.nodes) {
            n.draw()
        }
        //Delete later
        // for (const n of this.nvPairs) {
        //     n.draw()
        // }
    }
    connect(e, p1, p2) {
        const n1 = this.findNode(p1)
        const n2 = this.findNode(p2)
        e.setElementID('graphPanel')
        if (n1 !== undefined && n2 !== undefined) {
            e.connect(n1, n2)
            this.edges.push(e)
            return true
        }
        return false
    }
}
