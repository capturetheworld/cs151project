class Toolbar {
    constructor() {
        this.nodes = []
        this.edges = []

        const n1 = createNode(14, 7, 0, 'white', 'button', '', '')
        this.nodes.push(n1)
        const e1 = createLineEdge()
    }
    draw() {
        //Draw Buttons
        var buttonArea = document.getElementById('toolbarDiv')
        var button = document.createElement('button')
        button.type = 'button'
        button.style.position = 'absolute'
        button.id = 'button1'
        button.onclick = function () {
            const n1 = createNode(14, 7, 0, 'white', 'button', '', 'nodeContainer')
        }
        buttonArea.appendChild(button)


        for (const m of this.edges) {
            m.draw()
        }
        for (const n of this.nodes) {
            n.setElementID('button1')
            n.draw()
        }
    }
}