window.addEventListener('resize', function() {
    const panel = document.getElementById('graphPanel')
    panel.width = window.innerWidth
    panel.height = window.innerHeight

    const toolbar = document.getElementById('toolbar')
    toolbar.width = window.innerWidth
})

document.addEventListener('DOMContentLoaded', function () {
    const graph = new Graph()
    const n1 = createCircleNode(10, 10, 20, 'goldenrod')
    const n2 = createCircleNode(30, 30, 20, 'blue')
    const n3 = createNode(100, 100, 100, 'red')
    const e = createLineEdge()
    graph.add(n1)
    graph.add(n2)
    graph.add(n3)
    graph.connect(e, { x: 20, y: 20 }, { x: 40, y: 40 })
    graph.draw()

    const toolbar = document.getElementById('toolbar')
    toolbar.width = window.innerWidth

    const panel = document.getElementById('graphPanel')
    panel.width = window.innerWidth
    panel.height = window.innerHeight

    let selected = undefined
    let dragStartPoint = undefined
    let dragStartBounds = undefined

    function repaint() {
        panel.innerHTML = ''
        graph.draw()
        if (selected !== undefined) {
            const bounds = selected.getBounds()
            drawGrabber(bounds.x, bounds.y)
            drawGrabber(bounds.x + bounds.width, bounds.y)
            drawGrabber(bounds.x, bounds.y + bounds.height)
            drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
        }
    }

    function mouseLocation(event) {
        var rect = panel.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        }
    }

    panel.addEventListener('mousedown', event => {
        let mousePoint = mouseLocation(event)
        selected = graph.findNode(mousePoint)
        if (selected !== undefined) {
            dragStartPoint = mousePoint
            dragStartBounds = selected.getBounds()
        }
        repaint()
    })

    panel.addEventListener('mousemove', event => {
        if (dragStartPoint === undefined) return
        let mousePoint = mouseLocation(event)
        if (selected !== undefined) {
            const bounds = selected.getBounds();

            selected.translate(
                dragStartBounds.x - bounds.x +
                mousePoint.x - dragStartPoint.x,
                dragStartBounds.y - bounds.y +
                mousePoint.y - dragStartPoint.y);
            repaint()
        }
    })

    panel.addEventListener('mouseup', event => {
        dragStartPoint = undefined
        dragStartBounds = undefined
    })
})
