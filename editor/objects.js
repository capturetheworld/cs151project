function drawGrabber(x, y) {
    const size = 5;
    const canvas = document.getElementById('graphPanel')
    const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
    ctx.fillStyle = 'black'
    ctx.fillRect(x - size / 2, y - size / 2, size, size)
}

function createNode(x, y, size, color) {
    // return {
    //     getBounds: () => {
    //         return {
    //             x: x,
    //             y: y,
    //             width: size,
    //             height: size
    //         }
    //     },
    //     contains: p => {
    //         return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
    //     },
    //     translate: (dx, xy) => {
    //         x += dx
    //         y += dy
    //     },
    //     draw: () => {
    //         var body = document.getElementById('nodeContainer')
    //         var table = document.createElement('table')
    //         table.style.position = 'absolute'
    //         table.style.backgroundColor = color
    //         table.style.left = x
    //         table.style.top = y

    //         var tableBody = document.createElement('tbody')
    //         table.appendChild(tableBody)

    //         var tr = document.createElement('tr')
    //         tr.innerText = 'HELLO WORLD'
    //         tableBody.appendChild(tr)

    //         var tr2 = document.createElement('tr')
    //         tr2.innerText = 'Hi'
    //         tableBody.appendChild(tr2)

    //         body.appendChild(table)
    //     }
    // }
    return {
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
            // const canvas = document.getElementById('graphPanel')
            // const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
            // ctx.beginPath()
            // ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2, true)
            // ctx.fillStyle = color
            // ctx.fill()

            var body = document.getElementById('nodeContainer')
            var table = document.createElement('table')
            table.style.position = 'absolute'
            table.style.backgroundColor = color
            table.style.left = x
            table.style.top = y

            var tableBody = document.createElement('tbody')
            table.appendChild(tableBody)

            var tr = document.createElement('tr')
            tr.innerText = 'HELLO WORLD'
            tableBody.appendChild(tr)

            var tr2 = document.createElement('tr')
            tr2.innerText = 'Hi'
            tableBody.appendChild(tr2)

            body.appendChild(table)
        }
    }
}

function createCircleNode(x, y, size, color) {
    return {
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

function createLineEdge() {
    let start = undefined
    let end = undefined
    return {
        connect: (s, e) => {
            start = s
            end = e
        },
        draw: () => {
            const canvas = document.getElementById('graphPanel')
            const ctx = canvas.getContext('2d')
            ctx.beginPath()
            const p = center(start.getBounds()) // Just pick the center of the bounds for now
            const q = center(end.getBounds()) // Not the "connection points" that graphed2 uses
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
        }
    }
}