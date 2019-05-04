document.addEventListener('DOMContentLoaded', function () {

    //Create Graph
    const graph = new Graph()
    const n1 = createCircleNode(10, 10, 20, 'goldenrod')
    const n2 = createCircleNode(30, 30, 20, 'blue')
    const n3 = createNode(100, 100, 100, 'lightgray', 'nodeContainer')

    //Create Toolbar
    const toolbar = new Toolbar(graph)
    toolbar.draw()

    //Create Property sheet
    const properties = createPropertySheet()

    //const e = createCurvedLineEdge()
    graph.add(n1)
    graph.add(n2)
    graph.add(n3)
    //graph.connect(e, { x: 20, y: 20 }, { x: 40, y: 40 })
    graph.draw()

    const panel = document.getElementById('graphPanel')
    panel.width = window.innerWidth
    panel.height = window.innerHeight

    let selected = undefined
    let dragStartPoint = undefined
    let dragStartBounds = undefined
    let rubberBandStart = undefined
    let lastMousePoint = undefined

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
        let node = graph.findNode(mousePoint)
        //need to add edge contains first
        //let edge = graph.findEdge(mousePoint)
        let tool = toolbar.getSelectedTool()
        //selected = graph.findNode(mousePoint)
        toolbar.setSelected(selected)
        if(tool === undefined) {
          if(node !== undefined) {
            selected = node
            dragStartPoint = mousePoint
            dragStartBounds = node.getBounds()
            properties.setObj(node)
          }
          else selected == undefined
        }
        else /*if (tool instanceof createEdgeNode) */ {
          if (node !== undefined) rubberBandStart = mousePoint
        }
        /*
        if (node !== undefined && tool === undefined) {
            dragStartPoint = mousePoint
            dragStartBounds = node.getBounds()

            // focuses property sheet on new object
            //if(properties.object !=== selected)
            properties.setObj(node)

            //Right click
            // window.oncontextmenu = function () {
            //     prompt('Node', 'Name', 'Attributes')
            //     return false     // cancel default menu
            // }
        } */
        lastMousePoint = mousePoint
        repaint()
    })

    panel.addEventListener('mouseup', event => {
        let tool = toolbar.getSelectedTool()
        dragStartPoint = undefined
        dragStartBounds = undefined
        if(rubberBandStart !== undefined) {
          let mousePoint = mouseLocation(event)
          let newEdge = createLineEdge()
          graph.connect(newEdge,rubberBandStart,mousePoint)
        }
        repaint()
        lastMousePoint = undefined
        dragStartBounds = undefined
        rubberBandStart = undefined


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
})

window.addEventListener('resize', function () {
    const panel = document.getElementById('graphPanel')
    panel.width = window.innerWidth
    panel.height = window.innerHeight

    const toolbar = document.getElementById('toolbar')
    toolbar.width = window.innerWidth
})
