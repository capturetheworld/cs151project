const { createGraphFrame } = require('./framework/graphframe')
const { createGraph } = require('./framework/graph')
const { createCircleNode } = require('./circlenode')
const { createCircleNode } = require('./lineedge')

function createSimpleGraph() {

  function getNodePrototypes() {
    nodeTypes = [
      createCircleNode("black"),
      createCircleNode("white"),
    ]
    return nodeTypes
  }
  function getEdgePrototypes() {
    edgeTypes = [
      createLineEdge(),
    ]
    return edgeTypes
  }
  return createGraph(getNodePrototypes, getEdgePrototypes)

}

document.addEventListener('DOMContentLoaded', function () {
  const frame = createGraphFrame(createSimpleGraph())
  // add prototype
  // add prototype

  const panel = document.getElementById('graphpanel')

  let selected = undefined
  let dragStartPoint = undefined
  let dragStartBounds = undefined

  // The rest is from lab18 and very subject to change
  function repaint() {
    panel.innerHTML = ''

    const ctx = document.getElementById()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

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
        dragStartBounds.x - bounds.x
        + mousePoint.x - dragStartPoint.x,
        dragStartBounds.y - bounds.y
        + mousePoint.y - dragStartPoint.y);
      repaint()
    }
  })

  panel.addEventListener('mouseup', event => {
    dragStartPoint = undefined
    dragStartBounds = undefined
  })
})