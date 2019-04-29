class Toolbar {
    constructor() {
        this.nodes = []
        this.edges = []

        const n1 = createNode(14, 7, 0, 'white', 'button', '', '')
        this.nodes.push(n1)
        const e1 = createLineEdge()
    }
    addNode() {

    }
    draw() {
        //Draw Buttons
        var buttonArea = document.getElementById('toolbarDiv')
        var button = document.createElement('button')
        button.style.width = 50
        button.style.height = 50
        button.type = 'button'
        button.style.position = 'absolute'
        button.style.zIndex = 3
        button.id = 'button1'
        button.onclick = this.addNode()
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