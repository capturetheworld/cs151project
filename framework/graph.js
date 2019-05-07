/**
        * Creates the graph
    */


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
    deleteObj(n) {
        //Node Deletion
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i] === n) {
                let delNV = this.nodes[i].getNVPairs()
                this.nodes.splice(i, 1);

                console.log(delNV)
                if (delNV.length > 0) {

                    for (var i = 0; i < delNV.length; i++) {
                        for (var j = 0; j < this.nvPairs.length; j++) {

                            if (delNV[i].getIdentifier() === this.nvPairs[j].getIdentifier()){
                                this.nvPairs.splice(i, 1);
                            }

                            // if (delNV[i] === this.nvPairs[j]) {
                            //     this.nvPairs.splice(i, 1);

                            // }
                        }
                    }
                }
            }
        }
        //NVPair Deletion
        for (var i = 0; i < this.nvPairs.length; i++) {
            if (this.nvPairs[i] === n) {
                this.nvPairs.splice(i, 1);
            }
        }
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].deleteNVPair(n)
        }
        //Edge Deletion
        for (var i = 0; i < this.edges.length; i++) {
            if (this.edges[i] === n) {
                this.edges.splice(i, 1);
            }
        }
    }
    findEdge(p) {
        for (let i = this.edges.length - 1; i >= 0; i--) {
            const e = this.edges[i]
            if (e.contains(p)) return e
        }
    }

    /**
        * Looks for a node
        * @arg {node} p - looks for the node p on the canvas
        * @return {boolean}  - if it is found or not
    */
    findNode(p) {
        //Check if NVPair has been clicked
        for (let i = this.nvPairs.length - 1; i >= 0; i--) {
            const n = this.nvPairs[i]
            if (n.contains(p)) return n
        }

        //Check if the node has been clicked
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            const n = this.nodes[i]
            if (n.contains(p)) return n
        }
        return undefined
    }
    /**
    * Draws canvas
    */
    draw() {
        clearCanvas()
        for (const m of this.edges) {
            //need to reset the built in dashed function for canvas
            const canvas = document.getElementById(elementID)
            const ctx = canvas.getContext('2d')
            ctx.setLineDash([0, 0]);
            m.draw()
        }
        // let index = 0;
        for (const n of this.nodes) {
            n.draw()
        }
    }
    /**
    * Connects Nodes
    * @arg {point} p1 - pt 1
    * @arg {point} p2 - p2 2
    * @arg {element} e - connector
    * @return {boolean}  - if it is connected or not
*/
    connect(e, p1, p2) {
        const n1 = this.findNode(p1)
        const n2 = this.findNode(p2)
        e.setElementID('graphPanel')
        if (n1 !== undefined && n2 !== undefined) {
            e.connect(n1, n2)
            this.addEdge(e)
            return true
        }
        return false
    }
}
