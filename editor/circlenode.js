/**
        * Creates a circular node
        * @arg {int} x - the x position
        * @arg {int} y - the y position
        * @arg {int} s -  the size
        * @arg {string} c - color
        * @arg {int} id - id of the node
        * @return {createCircleNode~setElementID} - inner function: sets element ID
        * @return {createCircleNode~draw} - draws the node
        * @return {createCircleNode~translate} - draws the node of the canvs
    */

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

        /**
        * Checks to see if it contains a point
        * @return {boolean} - true or false if it contains a node
        */
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
        getAttributes() {
            // format:  getter (even index), setter (odd)
            return [
                this.getSize, this.setSize,
                this.getColor, this.setColor
            ]
        }

    }
}