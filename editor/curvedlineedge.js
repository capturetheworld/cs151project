/**
        * Creates a curvedLineEdge node
    */


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
        getAttributes() {
            return []
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
            q = centerEastWest(end.getBounds(),{x: p.x, y: p.y}) // Not the "connection points" that graphed2 uses
            p = centerEastWest(start.getBounds(), {x: q.x, y: q.y})
            let y1 = p.y
            let y2 = q.y
            let xmid = (p.x + q.x) / 2
            let ymid = (p.y + q.y) / 2
            let x1 = p.x + 10
            let x2 = q.x - 10
            path.moveTo(p.x, y1)
            path.lineTo(x1, y1);
            path.quadraticCurveTo(((x1 + xmid) / 2), y1, xmid, ymid)
            path.quadraticCurveTo(((x2 + xmid) / 2), y2, x2, y2)
            path.lineTo(q.x, y2);
            ctx.beginPath()
            ctx.moveTo(p.x, y1)
            ctx.lineTo(x1, y1);
            ctx.quadraticCurveTo(((x1 + xmid) / 2), y1, xmid, ymid)
            ctx.quadraticCurveTo(((x2 + xmid) / 2), y2, x2, y2)
            ctx.lineTo(q.x, y2);
            ctx.stroke()
            let arrowgraphic = undefined
            if(q.x > p.x){
              arrowgraphic = arrowHeadGenerator({x: q.x-10, y: q.y}, {x: q.x, y: q.y}, 'BlackTriangle')
            }
            else if (q.x <= p.x){
              arrowgraphic = arrowHeadGenerator({x: q.x+10, y: q.y}, {x: q.x - 10, y: q.y}, 'BlackTriangle')
            }
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
