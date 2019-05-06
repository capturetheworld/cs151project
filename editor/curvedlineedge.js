function createCurvedLineEdge() {
    let start = undefined
    let end = undefined
    let prototype = 'curvedEdge'
    let objectType = 'edge'
    let edgeID = undefined
    let path = new Path2D()
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
                x1: center(start.getBounds()).x,
                y1: center(start.getBounds()).y,
                x2: center(end.getBounds()).x,
                y2: center(end.getBounds()).y
            }
        },
        draw: () => {
            const canvas = document.getElementById(elementID)
            const ctx = canvas.getContext('2d')
            const p = center(start.getBounds()) // Just pick the center of the bounds for now
            const q = center(end.getBounds()) // Not the "connection points" that graphed2 uses
            path.moveTo(p.x, p.y)
            path.bezierCurveTo(p.x, q.y, q.x, p.y, q.x, q.y)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.bezierCurveTo(p.x, q.y, q.x, p.y, q.x, q.y)
            ctx.stroke()
            let arrow = arrowHeadGenerator(p, q, 'Triangle')
            ctx.stroke(arrow)
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
