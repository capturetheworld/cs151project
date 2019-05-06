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



