class Toolbar {

    constructor(graph) {
        this.nodes = [
            createNode(14, 7, 0, 'white', 'button', '', ''),
            createNode(14, 7, 0, 'white', 'button', '', '')
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

    draw() {
        //Draw Object Buttons
        let nodeIndex = 0
        for (const n of this.nodes) {
            var buttonArea = document.getElementById('toolbarDiv')
            var button = document.createElement('button')
            button.type = 'button'
            button.style.position = 'relative'
            button.id = 'button' + nodeIndex
            buttonArea.appendChild(button)
            n.setElementID('button' + nodeIndex)

            var self = this

            const elem = document.getElementById('button' + nodeIndex);
            elem.onclick = function () {
                const n = createNode(60, 60, 200, 'lightgray', 'nodeContainer')
                self.toolbarGraph.add(n)
                self.toolbarGraph.draw()
            }
            n.draw()
            this.tools.push(n.getPrototype())
            nodeIndex++
        }

        //Draw Edge Buttons
        for (const e of this.edges) {
            const buttonArea = document.getElementById('toolbarDiv')
            const canvas = document.createElement('canvas')
            canvas.id = 'canvasbutton' + nodeIndex
            canvas.style.position = 'relative'
            canvas.width = 45
            canvas.height = 45
            var button = document.createElement('button')
            button.type = 'button'
            button.style.position = 'relative'
            button.id = 'button' + nodeIndex
            buttonArea.appendChild(button)
            button.appendChild(canvas)
            e.setElementID('canvasbutton' + nodeIndex)

            var self = this

            const elem = document.getElementById('button' + nodeIndex);
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
            nodeIndex++
        }

        //Draw NVPair Button(s)
        for (const n of this.NVPairs) {
            let buttonArea = document.getElementById('toolbarDiv')
            let button = document.createElement('button')
            button.type = 'button'
            button.style.position = 'relative'
            button.id = 'buttonEdge'
            buttonArea.appendChild(button)
            n.setElementID('buttonEdge')

            let self = this
            document.getElementById('buttonEdge').onclick = function () {
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
