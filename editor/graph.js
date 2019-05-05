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
        //Check if NVPair has been clicked
        for (let i = this.nvPairs.length - 1; i >= 0; i--) {
            const n = this.nvPairs[i]
            if (n.contains(p)) return n
        }

        //check if the node has been clicked
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            const n = this.nodes[i]
            if (n.contains(p)) return n
        }
        return undefined
    }

    draw() {
        clearCanvas()
        for (const m of this.edges) {
          //need to reset the built in dashed function for canvas
          const canvas = document.getElementById(elementID)
          const ctx = canvas.getContext('2d')
          ctx.setLineDash([0, 0]);
          m.draw()
        }
        let index = 0;
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
