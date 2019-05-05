function drawGrabber(x, y) {
    const size = 5;
    const canvas = document.getElementById('graphPanel')
    const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
    ctx.fillStyle = 'black'
    ctx.fillRect(x - size / 2, y - size / 2, size, size)
}

function createNode(x, y, s, c, id, nm, attr) {
    let size = s
    let color = c
    let elementID = id
    let name = nm
    let attributes = attr
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
                width: size,
                height: size
            }
        },
        contains: p => {
            return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
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
            table.width = size

            var tableBody = document.createElement('tbody')

            var tr = document.createElement('tr')
            var th = document.createElement('th')
            if (name === undefined){
                th.innerText = 'Object Name'
            } else {
                th.innerText = name
            }
            tr.appendChild(th)
            tableBody.appendChild(tr)

            //Create NV divs
            let rowIndex = 0
            for(const n of nvPairs) {
                let tr = document.createElement('tr')
                let div = document.createElement('div')
                div.id =  nodeID +  'nvRow' + rowIndex
                tr.appendChild(div)
                tableBody.appendChild(tr)
                rowIndex++
            }
            table.appendChild(tableBody)
            body.appendChild(table)
            rowIndex = 0
            for(const n of nvPairs) {
                n.setElementID(nodeID +  'nvRow' + rowIndex)
                n.drawInCanvas()
                rowIndex++
            }

        },

        getElementID: ()=>{
            return elementID
        },
        // setElementID: (id) => {
        //     this.elementID = id
        // },
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

        getAttributes(){
             // format:  getter (even index), setter (odd)
            return [
                this.getElementID, this.setElementID,
                this.getObjectName, this.setObjectName
            ]
        }

    }
}

function createNVPair() {
    let x = 100
    let y = 100
    let size = 100
    // let parent = undefined
    let name = 'Name'
    let value = 'Value'
    let elementID = undefined
    let prototype = 'NVpair'
    let objectType = 'node'
    return {
        // setParent: (newParent) => {
        //     parent = newParent
        // },
        setElementID: (newID) => {
            elementID = newID
        },
        setName: (newName) => {
            name = newName
        },
        setValue: (newValue) => {
            value = newValue
        },
        getBounds: () => {
            return {
                x: x,
                y: y,
                width: size,
                height: size
            }
        },
        contains: p => {
            return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
        },
        translate: (dx, dy) => {
            x += dx
            y += dy
        },
        getPrototype: () => {
          return prototype
        },
        getObjectType: () => {
          return objectType
        },
        draw: () => {
            let body = document.getElementById(elementID)
            let table = document.createElement('table')
            table.style.fontSize = 5
            table.style.position = 'absolute'
            table.style.backgroundColor = 'white'
            table.style.left = 5
            table.style.top = 5
            table.width = 10

            let tableBody = document.createElement('tbody')
            table.appendChild(tableBody)

            let tr = document.createElement('tr')
            let th = document.createElement('th')
            th.innerText = name + ' = ' + value
            tr.appendChild(th)
            tableBody.appendChild(tr)

            body.appendChild(table)

        },

        drawInCanvas: () => {
            let body = document.getElementById(elementID)
            let table = document.createElement('table')
            table.style.fontSize = 12
            table.style.backgroundColor = 'lightgray'
            table.style.left = 5
            table.style.top = 5
            table.width = size

            let tableBody = document.createElement('tbody')
            table.appendChild(tableBody)

            let tr = document.createElement('tr')
            let th = document.createElement('th')
            th.innerText = name + ' = ' + value
            tr.appendChild(th)
            tableBody.appendChild(tr)

            body.appendChild(table)
        }
    }
}

function createCircleNode(x, y, s, c) {
    let size = s
    let color = c
    let prototype = 'circleNode'
    let objectType = 'node'

    return {
        setElementID: (newElementID) => {
            elementID = newElementID
        },
        getBounds: () => {
            return {
                x: x,
                y: y,
                width: size,
                height: size
            }
        },
        contains: p => {
            return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
        },
        translate: (dx, dy) => {
            x += dx
            y += dy
        },
        draw: () => {
            const canvas = document.getElementById('graphPanel')
            const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
            ctx.beginPath()
            ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2, true)
            ctx.fillStyle = color
            ctx.fill()
        },

        getSize: () => {
            return size
        },

        setSize: (s) => {
            size = Number(s)
        },
        getColor: () => {
            return color
        },
        setColor: (c) => {
            console.log("setting color")
            color = c
        },
        getPrototype: () => {
          return prototype
        },
        getObjectType: () => {
          return objectType
        },
        getAttributes(){
            // format:  getter (even index), setter (odd)
            return [
                this.getSize, this.setSize,
                this.getColor, this.setColor
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
    return {
        setElementID: (newElementID) => {
            elementID = newElementID
        },
        connect: (s, e) => {
            start = s
            end = e
        },
        dashed: (boolean) => {
          dashed = boolean
          if(dashed) prototype = 'dashedEdge'
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
            return  ptSegDistSq(center(start.getBounds()).x, center(start.getBounds()).y,
            center(end.getBounds()).x, center(end.getBounds()).y, aPoint.x, aPoint.y) < 2
        },
        draw: () => {
            const canvas = document.getElementById(elementID)
            const ctx = canvas.getContext('2d')
            if(dashed) {
              ctx.setLineDash([4, 4]);
            }
            ctx.beginPath()
            const p = center(start.getBounds()) // Just pick the center of the bounds for now
            const q = center(end.getBounds()) // Not the "connection points" that graphed2 uses
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x,q.y)
            ctx.stroke()
        },
    }
}

function createCurvedLineEdge() {
    let start = undefined
    let end = undefined
    let prototype = 'curvedEdge'
    let objectType = 'edge'
    let edgeID = undefined
    let path = undefined
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
        draw: () => {
          const canvas = document.getElementById(elementID)
          const ctx = canvas.getContext('2d')
          ctx.beginPath()
          const p = center(start.getBounds()) // Just pick the center of the bounds for now
          const q = center(end.getBounds()) // Not the "connection points" that graphed2 uses
          ctx.moveTo(p.x, p.y)
          ctx.bezierCurveTo(p.x, q.y, q.x, p.y, q.x, q.y)
          ctx.stroke()
        },
        getPrototype: () => {
          return prototype
        },
        getObjectType: () => {
          return objectType
        },
    }
}
