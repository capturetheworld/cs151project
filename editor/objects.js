function drawGrabber(x, y) {

    const size = 5;
    const canvas = document.getElementById('graphPanel')
    const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
    ctx.fillStyle = 'purple'
    ctx.fillRect(x - size / 2, y - size / 2, size, size)
}

function createNode(x, y, s, c, id) {
    let width = s
    let size = s
    let height = 0
    let parentheight = 55
    let color = c
    let elementID = id
    let name = ''
    // let attributes = attr
    let nvPairs = []
    let nodeID = undefined
    let prototype = 'genericNode'
    let objectType = 'node'
    return {
        setNodeID: (newNodeID) => {
            nodeID = newNodeID
        },
        addNVPair: (newNVPair) => {
            nvPairs.push(newNVPair)
        },
        setElementID: (newElementID) => {
            elementID = newElementID
        },
        setText: (newName, newAttributes) => {
            name = newName
            attributes = newAttributes
        },
        getBounds: () => {
            return {
                x: x,
                y: y,
                width: width,
                height: height
            }
        },
        contains: p => {
            // this creates a circle
            //return (x + width / 2 - p.x) ** 2 + (y + height / 2 - p.y) ** 2 <= size ** 2 / 4

            // rectangle
            return (Math.abs(x + width / 2 - p.x) < width / 2 && Math.abs(y + height / 2 - p.y) < height / 2)
        },
        translate: (dx, dy) => {
            x += dx
            y += dy
        },
        draw: () => {
            let body = document.getElementById(elementID)
            var table = document.createElement('table')
            table.style.position = 'absolute'
            table.style.backgroundColor = color
            table.style.left = x
            table.style.top = y
            table.width = width

            var tableBody = document.createElement('tbody')

            var tr = document.createElement('tr')
            var th = document.createElement('th')
            if (name === undefined) {
                th.innerText = 'Object Name'
            } else {
                th.innerText = name
            }
            tr.appendChild(th)

            tableBody.appendChild(tr)

            //Create NV divs
            let rowIndex = 0
            for (const n of nvPairs) {
                let tr = document.createElement('tr')
                let div = document.createElement('div')
                div.id = nodeID + 'nvRow' + rowIndex
                tr.appendChild(div)
                tableBody.appendChild(tr)

                rowIndex++
            }
            table.appendChild(tableBody)
            body.appendChild(table)
            rowIndex = 0
            for (const n of nvPairs) {
                n.setElementID(nodeID + 'nvRow' + rowIndex)
                n.drawInCanvas()
                rowIndex++
            }
            // gets height of table
            height = tableBody.offsetHeight


        },
        getElementID: () => {
            return elementID
        },
        getObjectName: () => {
            return name
        },
        setObjectName: (nm) => {
            name = nm
        },
        getPrototype: () => {
            return prototype
        },
        getObjectType: () => {
            return objectType
        },
        getAttributes() {
            // format:  getter (even index), setter (odd)
            return [
                
                this.getObjectName, this.setObjectName
            ]
        }
    }
}

function clearCanvas() {
    const canvas = document.getElementById('graphPanel')
    const ctx = canvas.getContext('2d') // No need for "if (canvas.getContext)"
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    var div = document.getElementById('nodeContainer');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function center(rect) {
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}

function createPointNode() {
    let x = 0
    let y = 0
    return {
        getBounds: () => {
            return {
                x: x,
                y: y,
                width: 0,
                height: 0
            }
        },
        translate: (dx, dy) => {
            x += dx
            y += dy
        }
    }
}

function createLineEdge() {
    let start = undefined
    let end = undefined
    let dashed = false
    let prototype = 'genericEdge'
    let objectType = 'edge'
    let startlabel = ''
    let midlabel = ''
    let endlabel = ''

    let arrowheadEnum = {
        none: 'none',
        Triangle: 'Triangle',
        V: 'V',
        Diamond: 'Diamond',
        BlackDiamond: 'BlackDiamond'
    }
    let arrowTypeStart = arrowheadEnum.none
    let arrowTypeEnd = arrowheadEnum.none

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
            if(arrowheadEnum[type]){
                arrowType = type
            }
            else{
                // none if typed wrong key
                arrowType = arrowheadEnum.none
            }
        },
        getArrowHeadStart: () => {
            return arrowTypeStart
        },
        setArrowHeadEnd: (type) => {
            if(arrowheadEnum[type]){
                arrowType = type
            }
            else{
                // none if typed wrong key
                arrowType = arrowheadEnum.none
            }
        },
        getArrowHeadEnd: () => {
            return arrowTypeEnd
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

