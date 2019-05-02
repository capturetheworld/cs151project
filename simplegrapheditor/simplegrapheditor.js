//const { createGraphFrame } = require('./framework/graphframe')
//const { createGraph } = require('./framework/graph')
//const { createCircleNode } = require('./circlenode')
//const { createEdgeNode } = require('./lineedge')

function drawGrabber(x, y) {
    const size = 5;
    const canvas = document.getElementById('graphpanel')
    const ctx = canvas.getContext('2d')
    
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.fillRect(x - size/2, y -size/2, size, size);
    ctx.fill()
}

function createPoint(x, y){
  
  return {
    getX: () =>{
      return x
    },
    getY: ()=>{
      return y
    }

  }
}

function createGraph(getNodePrototypes, getEdgePrototypes) {
  let nodes = []
  let edges = []

  return {
      connect: (e, point1, point2) => {
          n1 = findNode(point1)
          n2 = findNode(point2)

          if (n1 != undefined && n2 != undefined) {
              e.connect(n1, n2)
              edges.push(e)
              return true
          }
          return false
      },
      // add: (node, point) => {
      //     bounds = node.getBounds()
      //     node.translate(point.getX() - bounds.getX(), point.getY() - bounds.getY())
      //     nodes.push(node)
      //     return true
      // },
      add: (node) => {
        nodes.push(node)
      },

      findNode: (point) => {
          for (i = nodes.length - 1; i >= 0; i--) {
              node = nodes[i]
              if (node.contains(point)) return node;
          }
          return undefined
      },

      findEdge: (point) => {
          for (i = edges.size() - 1; i >= 0; i--) {
              e = edges[i]
              if (e.contains(p)) return e
          }
          return undefined
      },

      draw: () => {
          for (const n of nodes) { n.draw() }
          for (const e of edges) { e.draw() }
      },
      removeNode: (n) => {
          for (i = edges.length - 1; i >= 0; i--) {
              e = edges[i];
              if (e.getStart() == n || e.getEnd() == n) {
                  // Removing edge
                  edges = edges.slice(0, i).concat(edges.slice(i + 1, edges.length))
              }
          }

          // Finding the index of n before deleting
          for (i = 0; i < nodes.length; i++) {
              if (nodes[i] == n) {
                  // Removing node
                  nodes = nodes.slice(0, i).concat(nodes.slice(i + 1, nodes.length))
                  break
              }
          }

      },
      removeEdge: (e) => {
          // Finding the index of n before deleting
          for (i = 0; i < edges.length; i++) {
              if (edges[i] == e) {
                  // Removing node
                  edges = edges.slice(0, i).concat(edges.slice(i + 1, edges.length))
                  break
              }
          }

      },
      getBounds: () => {
          // TBD

      },
      getNodes: () => {
          return nodes
      },
      getEdges: () => {
          return edges
      },

  }
}

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

function createNewButton(x, y){

  const width = 40
  const height = 30
  
  return({

      getBounds: () => {
          
      },

      contains: (point) => {

          let diffx = Math.abs(point.x - (x + width/2))
          let diffy = Math.abs(point.y - (y + height/2))
          if(diffx < width/2 && diffy < height/2){
              console.log("clicked")
          }else{
            console.log("not clicked")
          }
      },

      draw: () => {
          const canvas = document.getElementById('graphpanel')
          const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
          ctx.strokeRect(x, y, width, height)
          
      }
  })
}

function createNewObject(x, y){

  const width = 40
  const height = 30
  let text = ''
  var attributes = 'default'
  
  var props = {text, attributes}

  return({

      getBounds: () => {
          
      },

      setAttribute: (str) => {
          text = str
          props[0] = text

      },

      
      getProps: ()=> {
        return props
      },

      contains: (point) => {

          let diffx = Math.abs(point.x - (x + width/2))
          let diffy = Math.abs(point.y - (y + height/2))
          
          if(diffx < width/2 && diffy < height/2){
              console.log("clicked")
          }
      },

      draw: () => {
          
          const canvas = document.getElementById('graphpanel')
          const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
          ctx.strokeRect(x, y, width, height)
          ctx.font = "15px Arial";
          ctx.fillText("help", x, y + height/2)
          
      }
  })
}

function createCircleNode(color) {
  let x = 0
  let y = 0
  let size = 20
  //let color = color
  
  // new: property sheet
  

  return {
      
      setColor: function setColor(c){
          color = c
      },
      getColor:  ()=>  {
          return color
      }, 

      getRadius: function getRadius(){
          return size
      },

      setRadius: function setRadius(rad){
          size = rad
      },
      
      getAttributes(){
          return [
              this.getColor, this.setColor,
              this.getRadius, this.setRadius,
          ]
      },

      clone: () => {
          // Probably totally wrong
          return createCircleNode(color)
      },
      
      draw: () => {
          const canvas = document.getElementById('graphpanel')
          const ctx = canvas.getContext('2d')
          
          ctx.beginPath()
          ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2, true);
          ctx.fillStyle = color
          ctx.fill() 
          
      },
      
      translate: (dx, dy) => {
          x += dx
          y += dy
      },
      
      contains: p => {
          return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
      },
      
      getBounds: () => {
          return {
              x: x,
              y: y,
              width: size,
              height: size
          }
      },
      
      getConnectionPoints: (other_point) => {
          centerX = x + size/2
          centerY = y + size/2
          dx = other_point.getX() - centerX
          dy = other_point.getY() - centerY
          distance = Math.sqrt(dx * dx + dy * dy)
          if (distance == 0){
              return other_point
          } else {
              // should return a new point. not defined yet
              throw "Should return a new point.. but havent finished defining. getConnectionPoints function." 
          }
      },    
  }
}

function createRectNode(color) {
    let x = 100
    let y = 0
    let width = 35
    let height = 20
    //let color = color
    
    return {
        
        setColor: (c) => {
            color = c
        },
        
        getColor: () => {
            return color
        }, 
        
        getWidth: function getWidth(){
            return width
        },
        test: () => {},
        setWidth: (sidelen) => {
            width = sidelen
        },

        getHeight: function getHeight() {
            return height
        },

        setHeight: function setHeight (sidelen){
            height = sidelen
        },

        clone: () => {
            // Probably totally wrong
            return createRectNode(color)
        },
        
        getAttributes(){
            return [
                this.getColor, this.setColor,
                this.getWidth, this.setWidth,
                this.getHeight, this.setHeight
            ]
        },
        
        draw: () => {
            const canvas = document.getElementById('graphpanel')
            const ctx = canvas.getContext('2d')
            ctx.fillRect(x, y, width, height);
            ctx.fillStyle = color
            ctx.fill()           
        },
        
        translate: (dx, dy) => {
            x += dx
            y += dy
        },
        
        contains: p => {
            return (x + width / 2 - p.x) ** 2 + (y + height / 2 - p.y) ** 2 <= width ** 2 / 4
        },
        
        getBounds: () => {
            return {
                x: x,
                y: y,
                width: width,
                height: height
            }
        },
    
        getConnectionPoints: (other_point) => {
            centerX = x + size/2
            centerY = y + size/2
            dx = other_point.getX() - centerX
            dy = other_point.getY() - centerY
            distance = Math.sqrt(dx * dx + dy * dy)
            if (distance == 0){
                return other_point
            } else {
                // should return a new point. not defined yet
                throw "Should return a new point.. but havent finished defining. getConnectionPoints function." 
            }
        },    
     }
  }


function createProp(text, id){
    
    // create prop wrapper
    let prop = document.createElement('div')
    prop.className = "prop"
    
    // label and input
    //let text = document.createTextNode("test")
    let label = document.createElement('p')
    label.className = "label"
    label.innerHTML = id
    
    let inp = document.createElement('input')
    inp.type = "text"
    inp.value = text
    inp.className = "input"

    prop.appendChild(label)
    prop.appendChild(inp)
    prop.id = id

    return prop
    
}

function createPropertySheet(){
    let container = document.getElementById('propertySheetWrapper')
    let form = document.createElement('form')
    let getters = []
    let setters = []

    let submit = document.createElement('button')
    submit.setAttribute('onclick', "saveProperties()")
    submit.className = "apply"
    container.appendChild(form)
    container.appendChild(submit)
    //form.setAttribute('onsubmit', "saveProperties()")

    return {
        setObj: (obj) => {
            // fetches functions (getters & setters) from 
            let attributes = obj.getAttributes()

            // gets property getters from evens
            getters = []
            for(i = 0; i < attributes.length; i+=2){getters.push(attributes[i])}

            // gets property setters from odds
            setters = []
            for(i = 1; i < attributes.length; i+=2){setters.push(attributes[i])}

            // clears old input elements
            while(form.firstChild){
                form.removeChild(form.firstChild)
            }
            
            while(container.submit){
                container.removeChild(submit)
            }

            // submit button
            //let submit = document.createElement("input")
            //submit.setAttribute('type', "submit")
            //submit.setAttribute('value', "Apply")
            let submit = document.createElement('button')
            submit.setAttribute('onclick', "saveProperties()")
            submit.className = "apply"

            // creates text input
            for(i = 0; i < getters.length; i++){
                // get label text: splice function name
                let functName = getters[i].name
                let label = functName.substring(3, functName.length)
                
                let input = createProp(getters[i](), label)
                form.appendChild(input)
            }

        }
    }
}

function saveProperties() {
    // takes properties and applies setters to all values
    console.log("submitted")


}

document.addEventListener('DOMContentLoaded', function () {
    //const frame = createGraphFrame(createSimpleGraph())
    // add prototype
    // add prototype
    const graph = createSimpleGraph()
    //Create Toolbar
    const toolbar = createToolbar()
    toolbar.addButton()
    toolbar.addButton()
    toolbar.addButton()

    
    const properties = createPropertySheet()
    //const b = createNewButton(100, 100)
    //const o = createNewObject(200, 100)
    const n1 = createCircleNode('goldenrod')
    const n2 = createCircleNode('blue')
    const r1 = createRectNode('blue')
    //graph.add(b)
    graph.add(n1)
    graph.add(n2)
    graph.add(r1)
    //graph.add(o)
    graph.draw()
    toolbar.draw()
    //properties.draw()

    

    const panel = document.getElementById('graphpanel')

    let selected = undefined
    let dragStartPoint = undefined
    let dragStartBounds = undefined

    // The rest is from lab18 and very subject to change
    function repaint() {
        panel.innerHTML = ''

        const ctx = panel.getContext('2d'); // No need for "if (canvas.getContext)"
        ctx.clearRect(0, 0, panel.width, panel.height)

        graph.draw()
        toolbar.draw()
        

        if (selected !== undefined) {
          const bounds = selected.getBounds()
          properties.setObj(selected)
          drawGrabber(bounds.x, bounds.y)
          drawGrabber(bounds.x + bounds.width, bounds.y)
          drawGrabber(bounds.x, bounds.y + bounds.height)
          drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
        }else{
            //properties.draw(undefined)
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