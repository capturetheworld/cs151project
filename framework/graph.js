function createGraph(getNodePrototypes, getEdgePrototypes) {
    let nodes = []
    let edges = []

    return {
        connect: (e, point1, point2) => {
            n1 = findNode(point1)
            n2 = findNode(point2)

            if (n1 != undefined && n2 != undefined) {
                e.connect(n1, n2)
                edges.push(e)
                return true
            }
            return false
        },
        add: (node, point) => {
            bounds = node.getBounds()
            node.translate(point.getX() - bounds.getX(), point.getY() - bounds.getY())
            nodes.push(node)
            return true
        },

        findNode: (point) => {
            for (i = nodes.length - 1; i >= 0; i--) {
                node = nodes[i]
                if (node.contains(point)) return node;
            }
            return undefined
        },

        findEdge: (point) => {
            for (i = edges.size() - 1; i >= 0; i--) {
                e = edges[i]
                if (e.contains(p)) return e
            }
            return undefined
        },

        draw: () => {
            for (const n of nodes) { n.draw() }
            for (const e of edges) { e.draw() }
        },
        removeNode: (n) => {
            for (i = edges.length - 1; i >= 0; i--) {
                e = edges[i];
                if (e.getStart() == n || e.getEnd() == n) {
                    // Removing edge
                    edges = edges.slice(0, i).concat(edges.slice(i + 1, edges.length))
                }
            }

            // Finding the index of n before deleting
            for (i = 0; i < nodes.length; i++) {
                if (nodes[i] == n) {
                    // Removing node
                    nodes = nodes.slice(0, i).concat(nodes.slice(i + 1, nodes.length))
                    break
                }
            }

        },
        removeEdge: (e) => {
            // Finding the index of n before deleting
            for (i = 0; i < edges.length; i++) {
                if (edges[i] == e) {
                    // Removing node
                    edges = edges.slice(0, i).concat(edges.slice(i + 1, edges.length))
                    break
                }
            }

        },
        getBounds: () => {
            // TBD

        },
        getNodes: () => {
            return nodes
        },
        getEdges: () => {
            return edges
        },

    }
}

export default { createGraph }