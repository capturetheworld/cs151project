function createLineEdge() {
    let start = undefined
    let end = undefined
    let dashed = false
    let prototype = 'genericEdge'
    let objectType = 'edge'
    let startlabel = ''
    let midlabel = ''
    let endlabel = ''
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
        getAttributes() {
            return [
                this.getStartLabel, this.setStartLabel,
                this.getMidLabel, this.setMidLabel,
                this.getEndLabel, this.setEndLabel
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
                x1: center(start.getBounds()).x,
                y1: center(start.getBounds()).y,
                x2: center(end.getBounds()).x,
                y2: center(end.getBounds()).y
            }
        },
        contains: aPoint => {
            return ptSegDistSq(center(start.getBounds()).x, center(start.getBounds()).y,
                center(end.getBounds()).x, center(end.getBounds()).y, aPoint.x, aPoint.y) < 4
        },
        draw: () => {
            const canvas = document.getElementById(elementID)
            const ctx = canvas.getContext('2d')
            if (dashed) {
                ctx.setLineDash([4, 4]);
            }
            ctx.beginPath()
            const p = center(start.getBounds()) // Just pick the center of the bounds for now
            const q = center(end.getBounds()) // Not the "connection points" that graphed2 uses
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()

            // Start and end labels
            ctx.font = "12px Helvetica";
            ctx.textAlign = "center";

            startX = p.x + (q.x - p.x) / 3.4
            startY = p.y + (q.y - p.y) / 3.4 - 4
            midX = p.x + (q.x - p.x) / 2
            midY = p.y + (q.y - p.y) / 2 - 4
            endX = q.x + (p.x - q.x) / 3.4
            endY = q.y + (p.y - q.y) / 3.4 - 4
            ctx.fillText(startlabel, startX, startY);
            ctx.fillText(midlabel, midX, midY);
            ctx.fillText(endlabel, endX, endY);

        },
    }

}


