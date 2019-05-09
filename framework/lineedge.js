/**
        * Creates a line edge
    */

function createLineEdge() {
    let start = undefined
    let end = undefined
    let dashed = false
    let prototype = 'genericEdge'
    let objectType = 'edge'
    let startlabel = ''
    let midlabel = ''
    let endlabel = ''
    let p = undefined
    let q = undefined
    let arrowTypeStart = 'none'
    let arrowTypeEnd = 'none'

    return {
        setElementID: (newElementID) => {
            elementID = newElementID
        },
        getStartLabel: () => {
            return startlabel
        },
        setStartLabel: (newlable) => {
            startlabel = newlable
        },
        getMidLabel: () => {
            return midlabel
        },
        setMidLabel: (newlabel) => {
            midlabel = newlabel
        },
        getEndLabel: () => {
            return endlabel
        },
        setEndLabel: (newlabel) => {
            endlabel = newlabel
        },

        setArrowHeadStart: (type) => {
            arrowTypeStart = type
        },
        getArrowHeadStart: () => {
            return {
                current: arrowTypeStart,
                none: 'none',
                V: 'V',
                BlackDiamond: 'BlackDiamond',
                BlackTriangle: 'BlackTriangle'            
            }
        },
        setArrowHeadEnd: (type) => {
            arrowTypeEnd = type
        },
        getArrowHeadEnd: () => {
            return {
                current: arrowTypeEnd,
                none: 'none',
                V: 'V',
                BlackDiamond: 'BlackDiamond',
                BlackTriangle: 'BlackTriangle'            
            }
        },

        getAttributes() {
            return [
                this.getStartLabel, this.setStartLabel,
                this.getMidLabel, this.setMidLabel,
                this.getEndLabel, this.setEndLabel,
                this.getArrowHeadStart, this.setArrowHeadStart,
                this.getArrowHeadEnd, this.setArrowHeadEnd
            ]
        },
        connect: (s, e) => {
            start = s
            end = e
        },
        dashed: (boolean) => {
            dashed = boolean
            if (dashed) prototype = 'dashedEdge'
        },
        getPrototype: () => {
            return prototype
        },
        getObjectType: () => {
            return objectType
        },
        getConnectionPoints: () => {
            return {
                x1: p.x,
                y1: p.y,
                x2: q.x,
                y2: q.y
            }
        },
        contains: aPoint => {
            return ptSegDistSq(p.x, p.y, q.x, q.y, aPoint.x, aPoint.y) < 4
        },
        draw: () => {
            const canvas = document.getElementById(elementID)
            const ctx = canvas.getContext('2d')
            if (dashed) {
                ctx.setLineDash([4, 4]);
            }
            ctx.beginPath()
            p = center(start.getBounds()) // Just pick the center of the bounds for now
            q = centerAll(end.getBounds(),{x: p.x, y: p.y}) // Not the "connection points" that graphed2 uses
            p = centerAll(start.getBounds(), {x: q.x, y: q.y})
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
            if (arrowTypeEnd !== 'none') {
              let arrowgraphic = arrowHeadGenerator(p, q, arrowTypeEnd)
              if(arrowTypeEnd === 'BlackDiamond' || arrowTypeEnd === 'BlackTriangle') {
                ctx.fillStyle = 'black'
                ctx.fill(arrowgraphic)
              }
              ctx.setLineDash([0, 0])
              ctx.stroke(arrowgraphic)
            }
            if (arrowTypeStart !== 'none') {
              let arrowgraphic = arrowHeadGenerator(q, p, arrowTypeStart)
              if(arrowTypeStart === 'BlackDiamond' || arrowTypeStart === 'BlackTriangle') {
                ctx.fillStyle = 'black'
                ctx.fill(arrowgraphic)
              }
              ctx.setLineDash([0, 0])
              ctx.stroke(arrowgraphic)
            }

            // Start and end labels
            ctx.font = "12px Helvetica";
            ctx.textAlign = "center";

            startX = p.x + (q.x - p.x) / 5
            startY = p.y + (q.y - p.y) / 5 - 6
            midX = p.x + (q.x - p.x) / 2
            midY = p.y + (q.y - p.y) / 2 - 6
            endX = q.x + (p.x - q.x) / 5
            endY = q.y + (p.y - q.y) / 5 - 6
            ctx.fillText(startlabel, startX, startY);
            ctx.fillText(midlabel, midX, midY);
            ctx.fillText(endlabel, endX, endY);

        },
    }

}
