class Toolbar {

    constructor(graph) {
        this.nodes = [
          createNode(14, 7, 0, 'white', 'button', '', ''),
          createNode(14, 7, 0, 'white', 'button', '', '')
        ]

        this.edges = [
          createLineEdge()
        ]
        this.toolbarGraph = graph
        this.name = 'hello'

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
            nodeIndex++
        }

        //Draw Edge Buttons
        for (const e of this.edges) {
            var buttonArea = document.getElementById('toolbarDiv')
            var button = document.createElement('button')
            button.type = 'button'
            button.style.position = 'relative'
            button.id = 'button' + nodeIndex
            buttonArea.appendChild(button)
            e.setElementID('button' + nodeIndex)

            var self = this

            const elem = document.getElementById('button' + nodeIndex);
            elem.onclick = function () {
                const n = createNode(60, 60, 200, 'lightgray', 'nodeContainer')
                self.toolbarGraph.add(n)
                self.toolbarGraph.draw()
            }
            const s = createPointNode()
            const f = createPointNode()
            s.translate(5,45)
            f.translate(45,5)
            e.connect(s,f)
            e.draw()
            nodeIndex++
        }
    }
}
