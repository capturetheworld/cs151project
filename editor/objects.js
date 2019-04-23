function drawGrabber(x, y) {
    const size = 5;
    const canvas = document.getElementById('graphpanel')
    const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
    ctx.fillStyle = 'black'
    ctx.fillRect(x - size / 2, y - size / 2, size, size)
}

function createNode(x, y) {
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
        translate: (dx, xy) => {
            x += dx
            y += dy
        },
        draw: () => {
            // const container = document.getElementById('nodeContainer')
            // const table = document.createElement('table')
            // const tr = document.createElement('tr')
            // const td = document.createElement('td')
            // table.appendChild(tr)
            // tr.appendChild(td)
            // table.style.position = 'absolute'
            // table.style.left = x + 'px'
            // table.style.top = y + 'px'
            // table.style.width = size + 'px'
            // table.style.height = size + 'px'
            // table.style.background = color
            // container.appendChild(table)
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
            const canvas = document.getElementById('graphpanel')
            const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
            ctx.beginPath()
            ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2, true)
            ctx.fillStyle = color
            ctx.fill()
            // const container = document.getElementById('nodeContainer')
            // const table = document.createElement('table')
            // const tr = document.createElement('tr')
            // const td = document.createElement('td')
            // table.appendChild(tr)
            // tr.appendChild(td)
            // table.style.position = 'absolute'
            // table.style.left = x + 'px'
            // table.style.top = y + 'px'
            // table.style.width = size + 'px'
            // table.style.height = size + 'px'
            // table.style.background = color
            // container.appendChild(table)
        }
    }
}

function clearCanvas() {
    const canvas = document.getElementById('graphpanel')
    const ctx = canvas.getContext('2d') // No need for "if (canvas.getContext)"
    ctx.clearRect(0, 0, canvas.width, canvas.height)
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
            const canvas = document.getElementById('graphpanel')
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