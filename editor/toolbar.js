class Toolbar {

    constructor(graph) {
        this.nodes = [
            createNode(14, 7, 0, 'white', 'button', '', ''),
        ]
        this.edges = [
            createCurvedLineEdge(),
            createLineEdge(),
        ]
        this.NVPairs = [
            createNVPair()
        ]
        this.tools = []
        var dashedEdge = createLineEdge()
        dashedEdge.dashed(true)
        this.edges.push(dashedEdge)
        this.toolbarGraph = graph
        this.selectedTool = undefined
        this.buttons = []
    }

    getSelectedTool() {
        return this.selectedTool
    }

    setSelectedTool(elem) {
        this.selectedTool = elem
    }

    setSelected(newSelected) {
        this.selected = newSelected
    }

    drawGrabberButton() {
      var buttonArea = document.getElementById('toolbarDiv')
      var button = document.createElement('button')
      button.type = 'button'
      button.style.position = 'relative'
      button.id = 'grabberButton'
      button.style.backgroundColor = 'white'
      buttonArea.appendChild(button)
      document.getElementById('grabberButton').onclick = function () {
        const buttons = document.getElementsByTagName('button')
        for (const n of buttons) {
            n.style.backgroundColor = 'white'
        }
        button.style.backgroundColor = 'lightblue'
    }
      var self = this
      const elem = document.getElementById('grabberButton')
      elem.addEventListener('mousedown', event => {
        this.selectedTool = undefined
      })
      this.tools.push(undefined)
      buttonArea.appendChild(button)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext("2d")
      canvas.id = 'grabberButtonCanvas'
      canvas.style.position = 'relative'
      canvas.width = 45
      canvas.height = 45
      ctx.fillStyle = "purple"
      ctx.fillRect(3, 8, 6, 6)
      ctx.fillRect(3, 30, 6, 6)
      ctx.fillRect(24, 8, 6, 6)
      ctx.fillRect(24, 30, 6, 6)
      button.appendChild(canvas)
    }

    draw() {
        //Draw Node Buttons
        this.drawGrabberButton()
        let nodeIndex = 0
        for (const n of this.nodes) {
            let buttonArea = document.getElementById('toolbarDiv')
            let button = document.createElement('button')
            button.type = 'button'
            button.style.position = 'relative'
            button.id = 'nodeButton' + nodeIndex
            button.style.backgroundColor = 'white'
            buttonArea.appendChild(button)
            n.setElementID('nodeButton' + nodeIndex)

            let self = this
            const elem = document.getElementById('nodeButton' + nodeIndex)
            elem.onclick = function () {
                const buttons = document.getElementsByTagName('button')
                for (const n of buttons) {
                    n.style.backgroundColor = 'white'
                }
                elem.style.backgroundColor = 'lightblue'
                // const n = createNode(60, 60, 100, 'lightgray', 'nodeContainer')
                // n.setNodeID(nodeIndex)
                // self.toolbarGraph.add(n)
                // self.toolbarGraph.draw()
            }
            
            
            elem.addEventListener('mousedown', event => {
              this.selectedTool = n.getPrototype()
            })
            n.draw()
            this.tools.push(n.getPrototype())
            nodeIndex++
        }

        //Draw Edge Buttons
        let edgeIndex = 0
        for (const e of this.edges) {
            const buttonArea = document.getElementById('toolbarDiv')
            const canvas = document.createElement('canvas')
            canvas.id = 'edgeButtonCanvas' + edgeIndex
            canvas.style.position = 'relative'
            canvas.width = 45
            canvas.height = 45
            var button = document.createElement('button')
            button.type = 'button'
            button.style.position = 'relative'
            button.id = 'edgeButton' + edgeIndex
            button.style.backgroundColor = 'white'
            buttonArea.appendChild(button)
            button.appendChild(canvas)
            e.setElementID('edgeButtonCanvas' + edgeIndex)

            var self = this
            const elem = document.getElementById('edgeButton' + edgeIndex)
            elem.onclick = function () {
                const buttons = document.getElementsByTagName('button')
                for (const n of buttons) {
                    n.style.backgroundColor = 'white'
                }
                elem.style.backgroundColor = 'lightblue'
            }
            elem.addEventListener('mousedown', event => {
                this.selectedTool = e.getPrototype()
            })
            let s = createPointNode()
            let f = createPointNode()
            s.translate(5, 40)
            f.translate(30, 10)
            e.connect(s, f)
            e.draw()
            this.tools.push(e.getPrototype())
            edgeIndex++
        }

        //Draw NVPair Button(s)
        for (const n of this.NVPairs) {
            let buttonArea = document.getElementById('toolbarDiv')
            let button = document.createElement('button')
            button.type = 'button'
            button.style.position = 'relative'
            button.id = 'nvButton'
            button.style.backgroundColor = 'white'
            buttonArea.appendChild(button)
            n.setElementID('nvButton')

            let self = this
            document.getElementById('nvButton').onclick = function () {
                if (self.selected == undefined) {
                    alert("Nothing Selected.")
                } else {
                    const n = createNVPair()
                    self.selected.addNVPair(n)
                    // n.setElementID('nodeContainer')
                    self.toolbarGraph.addNVPair(n)
                    self.toolbarGraph.draw()
                }
            }
            this.tools.push(n.getPrototype())
            n.draw()
        }
    }
}
