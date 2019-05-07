/**
* Creates an NV Pair Node
*/
function createNVPair() {
    let x = 100
    let y = 100
    let size = 120
    let width = 0
    let height = 0
    let name = 'Name'
    let value = 'Value'
    let elementID = undefined
    let prototype = 'NVpair'
    let objectType = 'node'
    let identifier = undefined
    return {
        setIdentifier: (id) => {
            identifier = undefined
        },
        getIdentifier: () => {
            return identifier
        },
        setElementID: (newID) => {
            elementID = newID
        },
        getName: () => {
            return name
        },
        setName: (newName) => {
            name = newName
        },
        getValue: () => {
            return value
        },
        setValue: (newValue) => {
            value = newValue
        },
        getBounds: () => {
            return {
                x: x,
                y: y,
                width: width,
                height: height
            }
        },
        getAttributes() {
            return [this.getName, this.setName,
            this.getValue, this.setValue]
        },
        contains: p => {
            return (Math.abs(x + width / 2 - p.x) < width / 2 && Math.abs(y + height / 2 - p.y) < height / 2)
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
            tr.offsetWidth = width
            th.offsetWidth = width

            //mark position of the nvpair
            let bounds = body.getBoundingClientRect()
            x = bounds.x - 3
            y = bounds.y - 70
            width = bounds.width
            height = bounds.height
        }
    }
}