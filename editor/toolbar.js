class Toolbar {
    constructor() {
        this.nodes = []
        this.edges = []
    }
    create() {
        const n1 = createNode(0, 0, 0, 'red', 'button')

        this.nodes.push(n1)
    }
    addNode(n) {
        this.nodes.push(n)
    }
    addEdge(n) {
        this.edges.push(n)
    }
    findNode(p) {
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
    }
    connect(e, p1, p2) {
        const n1 = this.findNode(p1)
        const n2 = this.findNode(p2)
        if (n1 !== undefined && n2 !== undefined) {
            e.connect(n1, n2)
            this.edges.push(e)
            return true
        }
        return false
    }
}