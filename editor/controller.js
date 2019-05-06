document.addEventListener('DOMContentLoaded', function () {

  const panel = document.getElementById('graphPanel')

  //Create Graph
  const graph = new Graph()

  //Prototype Objects
  //const n1 = createCircleNode(10, 10, 20, 'goldenrod')
  //const n2 = createCircleNode(30, 30, 20, 'blue')
  //const n3 = createNode(100, 100, 100, 'lightgray', 'nodeContainer')
  //n3.setNodeID(0)

  //Create Toolbar
  const toolbar = new Toolbar(graph)
  toolbar.draw()

  //Create Property sheet
  const properties = createPropertySheet()
  properties.setGraph(graph)

  resize()
  graph.draw()

  let selected = undefined
  let dragStartPoint = undefined
  let dragStartBounds = undefined
  let rubberBandStart = undefined
  let lastMousePoint = undefined

  function repaint() {
    panel.innerHTML = ''
    graph.draw()
    if (selected !== undefined) {
      if (selected.getObjectType() === 'node') {
        const bounds = selected.getBounds()
        drawGrabber(bounds.x, bounds.y)
        drawGrabber(bounds.x + bounds.width, bounds.y)
        drawGrabber(bounds.x, bounds.y + bounds.height)
        drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
      }
      if (selected.getObjectType() === 'edge') {
        drawGrabber(selected.getConnectionPoints().x1, selected.getConnectionPoints().y1)
        drawGrabber(selected.getConnectionPoints().x2, selected.getConnectionPoints().y2)
      }
    }
    if (rubberBandStart !== undefined) {
      ctx = panel.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(rubberBandStart.x, rubberBandStart.y)
      ctx.lineTo(lastMousePoint.x, lastMousePoint.y)
      ctx.stroke()
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
    selected = undefined
    let mousePoint = mouseLocation(event)
    let node = graph.findNode(mousePoint)
    //need to add edge contains first
    let edge = graph.findEdge(mousePoint)
    let tool = toolbar.getSelectedTool()
    //selected = graph.findNode(mousePoint)
    if (tool === undefined) {
      if (node !== undefined) {
        selected = node
        dragStartPoint = mousePoint
        dragStartBounds = node.getBounds()
        properties.setObj(node)
      }
      else if (edge !== undefined) {
        selected = edge
        properties.setObj(edge)
      }
      else selected = undefined
    }
    else if (tool === 'genericNode'){
      const n = createNode(mousePoint.x, mousePoint.y, 120, 'lightgray', 'nodeContainer')
      n.setNodeID(graph.nodes.length)
      n.setObjectName('Object Name')
      graph.add(n)
      graph.draw()
    }
    else if (tool === 'curvedEdge') {
      if (node !== undefined) {
        rubberBandStart = mousePoint
        dragStartPoint = rubberBandStart
      }
    }
    else if (tool === 'genericEdge') {
      if (node !== undefined) {
        rubberBandStart = mousePoint
        dragStartPoint = rubberBandStart
      }
    }
    else if (tool === 'dashedEdge') {
      if (node !== undefined) {
        rubberBandStart = mousePoint
        dragStartPoint = rubberBandStart
      }
    }
    lastMousePoint = mousePoint
    toolbar.setSelected(selected)
    repaint()
  })

  panel.addEventListener('mouseup', event => {
    let tool = toolbar.getSelectedTool()
    dragStartPoint = undefined
    dragStartBounds = undefined
    if (rubberBandStart !== undefined) {
      let mousePoint = mouseLocation(event)
      if (tool === 'curvedEdge') {
        let newEdge = createCurvedLineEdge()
        graph.connect(newEdge, rubberBandStart, mousePoint)
      }
      else if (tool === 'genericEdge') {
        let newEdge = createLineEdge()
        graph.connect(newEdge, rubberBandStart, mousePoint)
      }
      else if (tool === 'dashedEdge') {
        let newEdge = createLineEdge()
        newEdge.dashed(true)
        graph.connect(newEdge, rubberBandStart, mousePoint)
      }
    }
    lastMousePoint = undefined
    dragStartBounds = undefined
    rubberBandStart = undefined
    repaint()
  })

  panel.addEventListener('mousemove', event => {
    if (dragStartPoint === undefined) return
    let mousePoint = mouseLocation(event)
    if (selected === undefined) {
      lastMousePoint = mousePoint
      repaint()
      return
    }
    if (selected.getObjectType() === 'node') {
      const bounds = selected.getBounds();
      selected.translate(
        dragStartBounds.x - bounds.x +
        mousePoint.x - dragStartPoint.x,
        dragStartBounds.y - bounds.y +
        mousePoint.y - dragStartPoint.y);
    }
    lastMousePoint = mousePoint
    repaint()
  })
})

function resize() {
    let toolbar = document.getElementById('toolbarDiv')
    let panelDiv = document.getElementById('graphDiv')
    let panel = document.getElementById('graphPanel')
    let properties = document.getElementById('propertySheetWrapper')

    let tbHeight = Number(toolbar.clientHeight)
    let propHeight = Number(properties.clientHeight)

    toolbar.width = window.innerWidth
    panelDiv.style.width = window.innerWidth
    panelDiv.style.height = window.innerHeight - tbHeight - propHeight - 2

    panel.height = window.innerHeight - tbHeight - propHeight - 7
    panel.width = window.innerWidth - 6
}

window.addEventListener('resize', resize)
