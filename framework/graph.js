
function createGraph(getNodePrototypes, getEdgePrototypes){
    let nodes = []
    let edges = []

    return {
        connect: (e, point1, point2) => {
            n1 = findNode(point1)
            n2 = findNode(point2)

            if(n1 != undefined && n2 != undefined){
                e.connect(n1, n2)
                edges.add(e)
                return true
            }
            return false
        },
        add: (node, point) =>{
            bounds = node.getBounds()
            node.translate(point.getX() - bounds.getX(),point.getY() - bounds.getY())
            nodes.add(node)
            return true
        },

        findNode: (point) => {
            for (i = nodes.size() - 1; i >= 0; i--){
                node = nodes.get(i)
                if(node.contains(point)) return node;
            }
            return undefined
        },
        
        findEdge: (point) => {
            for (i = edges.size() - 1; i >= 0; i--){
                e = edges.get(i)
                if (e.contains(p)) return e
            }
            return undefined
        },
        
        draw: () => {

        },
        removeNode: () => {

        },
        removeEdge: () => {

        },
        getBounds: () => {

        },
        getNodes: () => {

        },
        getEdges: () => {

        },
        
    }
}

module.exports = {createGraph}