/**
        * Creates a note node
    */
function createNote() {
    let width = 8
    let height = 0
    let color = 'yellow'
    let elementID = ''
    let name = ''
    let nodeID = undefined
    let prototype = 'genericNode'
    let objectType = 'node'
    return {
        setNodeID: (newNodeID) => {
            nodeID = newNodeID
        },
        setElementID: (newElementID) => {
            elementID = newElementID
        },
        setText: (newName, newAttributes) => {
            name = newName
            attributes = newAttributes
        },

         setColor: (newColor) => {
            color = newColor
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
        * Moves the x y position
        * @arg {int} dx - change of x position
        * @arg {int} dy - change of y position
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

        
            // gets height of table
            height = tableBody.offsetHeight


        },

        getElementID: () => {
            return elementID
        },
        getObjectName: () => {
            return name
        },
        getColor: () => {
            return color
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

