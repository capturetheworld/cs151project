function createNote(x, y, w, h, c, id) {
    let width = w
    let height = h
    let color = c
    let elementID = id
    let name = ''
    let nodeID = undefined
    let prototype = 'noteNode'
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
          const canvas = document.getElementById(elementID)
          const ctx = canvas.getContext('2d')
            ctx.beginPath()
            ctx.rect(x, y, width, height)
            ctx.fillStyle = color
            ctx.fill()
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
        getWidth: () => {
            return width
        },

        setWidth: (w) => {
            width = Number(w)
        },
        getHeight: () => {
            return height
        },

        setHeight: (h) => {
            height = Number(h)
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
        getAttributes() {
            // format:  getter (even index), setter (odd)
            return [
                this.getWidth, this.setWidth,
                this.getHeight, this.setHeight,
                this.getColor, this.setColor
            ]
        }
    }
}
