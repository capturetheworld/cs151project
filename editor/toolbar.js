class Toolbar {

    constructor(graph) {
        this.nodes = []
        this.edges = []
        this.toolbarGraph = graph
        this.name = 'hello'

        const n1 = createNode(14, 7, 0, 'white', 'button', '', '')
        this.nodes.push(n1)
        const e1 = createLineEdge()
    }

    /* A button factory function. Will return a button object. Feel free to change. */
    createNewButton(x, y) {
        const width = 40
        const height = 30
        return ({
            getBounds: () => {
            },
            // For now, outputs "Clicked" to console when clicked
            contains: (point) => {
                let diffx = Math.abs(point.x - (x + width / 2))
                let diffy = Math.abs(point.y - (y + height / 2))
                if (diffx < width / 2 && diffy < height / 2) {
                    console.log("clicked")
                }
            },

            draw: () => {
                const canvas = document.getElementById('graphpanel')
                const ctx = canvas.getContext('2d');
                ctx.strokeRect(x, y, width, height)

            }
        })
    }

    draw() {
        //Draw Buttons
        for (const m of this.edges) {
            m.draw()
        }
        let nodeIndex = 0
        for (const n of this.nodes) {
            let buttonArea = document.getElementById('toolbarDiv')
            let button = document.createElement('button')
            button.type = 'button'
            button.style.position = 'relative'
            button.id = 'button' + nodeIndex
            buttonArea.appendChild(button)
            n.setElementID('button' + nodeIndex)

            let self = this

            const elem = document.getElementById('button' + nodeIndex);
            elem.onclick = function () {
                const n = createNode(60, 60, 200, 'lightgray', 'nodeContainer')
                self.toolbarGraph.add(n)
                self.toolbarGraph.draw()
            }

            n.draw()
            nodeIndex++
        }
    }
}
