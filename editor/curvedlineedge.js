function createCurvedLineEdge() {
    let start = undefined
    let end = undefined
    let prototype = 'curvedEdge'
    let objectType = 'edge'
    let edgeID = undefined
    let path = new Path2D()
    let p = undefined
    let q = undefined
    return {
        setElementID: (newElementID) => {
            elementID = newElementID
        },
        setEdgeID: (id) => {
            edgeID = id
        },
        getEdgeID: () => {
            return edgeID
        },
        connect: (s, e) => {
            start = s
            end = e
        },
        getPath: () => {
            return path
        },
        setPath: path2d => {
            path = path2d
        },
        contains: p => {
            const canvas = document.getElementById(elementID)
            const ctx = canvas.getContext('2d')
            return ctx.isPointInPath(path, p.x, p.y)
        },
        getConnectionPoints: () => {
            return {
                x1: p.x,
                y1: p.y,
                x2: q.x,
                y2: q.y
            }
        },
        draw: () => {
            const canvas = document.getElementById(elementID)
            const ctx = canvas.getContext('2d')
            p = center(start.getBounds()) // Just pick the center of the bounds for now
            q = center2(end.getBounds(),{x: p.x, y: p.y}) // Not the "connection points" that graphed2 uses
            p = center2(start.getBounds(), {x: q.x, y: q.y})
            path.moveTo(p.x, p.y)
            path.bezierCurveTo(p.x, q.y, q.x, p.y, q.x, q.y)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.bezierCurveTo(p.x, q.y, q.x, p.y, q.x, q.y)
            ctx.stroke()
            let arrowgraphic = arrowHeadGenerator({x: p.x, y: p.y}, {x: q.x, y: q.y}, 'BlackTriangle')
            ctx.fillStyle = 'black'
            ctx.fill(arrowgraphic)
            ctx.stroke(arrowgraphic)
            var self = this
        },
        getPrototype: () => {
            return prototype
        },
        getObjectType: () => {
            return objectType
        },
    }
}
