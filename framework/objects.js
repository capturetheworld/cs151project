/**
        * Sets the tool the user selected
        * @arg {int} x - the x position
        * @arg {int} y - the y position
    */
function drawGrabber(x, y) {
    const size = 8;
    const canvas = document.getElementById('graphPanel')
    const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
    ctx.fillStyle = 'purple'
    ctx.fillRect(x - size + 2, y - size, size, size)
}

/**
        * Sets the tool the user selected
        * @arg x - the x position
        * @arg y - the y position
        * @arg s -  the size
        * @arg c - color
        * @arg id - id of the node
        * @return  - inner function: sets node ID
        * @return - adds a Name Value pair - inner
        * @return - sets element id to a new ID
    */

function createNode(x, y, s, c, id) {
    let width = s
    let size = s
    let height = 0
    let parentheight = 55
    let color = c
    let elementID = id
    let name = ''
    let nvPairs = []
    let nodeID = undefined
    let prototype = 'genericNode'
    let objectType = 'node'
    return {
        getNVPairs: () => {
            return nvPairs
        },
        deleteNVPair: (n) => {
            for (var i = 0; i < nvPairs.length; i++) {
                if (nvPairs[i] === n) {
                    nvPairs.splice(i, 1);
                    // alert('removed nvpair')
                }
            }
        },
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
        /**
        * Returns the bounds
        * @return {int} x - x position
        * @return {int} y - y position
        * @return {int} width- width of the bounds
        * @return {int} height- height of the bounds
    */

        getBounds: () => {
            return {
                x: x,
                y: y,
                width: width,
                height: height
            }
        },
        /**
            * Checks if point is contained
            * @arg p - a point
            * @return - if the point is inside or not
        */

        contains: p => {
            return (Math.abs(x + width / 2 - p.x) < width / 2 && Math.abs(y + height / 2 - p.y) < height / 2)
        },
        /**
        * Moves the x y position
        * @arg dx - change of x position
        * @arg dy - change of y position
    */
        translate: (dx, dy) => {
            x += dx
            y += dy
        },

        /**
        * Draws the node
        */
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
        /**
                * Sets the tool the user selected
                * @arg x - the x position
                * @arg y - the y position
                * @arg s -  the size
                * @arg c - color
                * @arg id - id of the node
                * @return {createNode~setNodeID} - inner function: sets node ID
                * @return {createNode~addNVPair} - adds a Name Value pair - inner
                * @return {createNode~setElementID} - sets element id to a new ID
            */


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

function centerEastWest(rect, fromP) {
    if (fromP.x >= rect.x)
        return { x: rect.x + rect.width, y: rect.y + rect.height / 2 }
    else if (fromP.x < rect.x)
        return { x: rect.x, y: rect.y + rect.height / 2 }
}

function centerAll(rect, fromP) {
    let centerX = rect.x + rect.width / 2;
    let centerY = rect.y + rect.height / 2;
    let dx = fromP.x - centerX;
    let dy = fromP.y - centerY;
    if (dx < dy && dx >= -dy)
        return {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height
        }
    else if (dx >= dy && dx >= -dy)
        return {
            x: rect.x + rect.width,
            y: rect.y + rect.height / 2
        }
    else if (dx < -dy && dx >= dy)
        return {
            x: rect.x + rect.width / 2,
            y: rect.y
        }
    else if (dx < dy && dx < -dy)
        return {
            x: rect.x,
            y: rect.y + rect.height / 2
        }
    else return other;
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
