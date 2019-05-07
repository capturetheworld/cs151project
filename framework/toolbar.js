/**
*A toolbar with buttons on it that creates nodes, selections, and more
* @summary creates a toolbar
*/


class Toolbar {

    /**
    * Creates a new graph.
     *@constructor
    */

    constructor(graph) {
        this.nodes = [
            createNode(14, 7, 0, 'white', 'button')
        ]
        this.edges = [
            createCurvedLineEdge(),
            createLineEdge(),
        ]
        this.NVPairs = [
            createNVPair()
        ]
        this.notes = [
            createNote()
        ]
        this.tools = []
        var dashedEdge = createLineEdge()
        dashedEdge.dashed(true)
        this.edges.push(dashedEdge)
        this.toolbarGraph = graph
        this.selectedTool = undefined
        this.buttons = []
    }


    /**  
       *Returns the selection tool
       * @returns selectedTool
   */

    getSelectedTool() {
        return this.selectedTool
    }

    /** 
        * Sets the tool the user selected
        * @arg elem
    */

    setSelectedTool(elem) {
        this.selectedTool = elem
    }

    /**  
       * Sets newly selected tool to whatever the user selects next
       * @arg newSelected
   */

    setSelected(newSelected) {
        this.selected = newSelected
    }

    /**  
       * Draws the button that is for selection
   */

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
        ctx.fillRect(3, 8, 8, 8)
        ctx.fillRect(3, 30, 8, 8)
        ctx.fillRect(24, 8, 8, 8)
        ctx.fillRect(24, 30, 8, 8)
        button.appendChild(canvas)
        //the actual button on toolbar
    }

    drawDeleteButton() {
        //Draw Delete Button
        let buttonArea = document.getElementById('toolbarDiv')
        let button = document.createElement('button')
        button.type = 'button'
        button.style.position = 'absolute'
        button.id = 'deleteButton'
        button.style.backgroundColor = 'white'
        buttonArea.appendChild(button)
        button.innerText = 'Delete'

        let self = this
        document.getElementById('deleteButton').onclick = function () {
            if (self.selected == undefined) {
                alert("Nothing Selected.")
            } else {
                self.toolbarGraph.deleteObj(self.selected)
                self.toolbarGraph.draw()
            }
        }
    }

    /** 
        * Draws a button to create nodes
    */

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
                    self.toolbarGraph.addNVPair(n)
                    self.toolbarGraph.draw()
                }
            }
            this.tools.push(n.getPrototype())
            n.draw()
        }

        this.drawDeleteButton()

        //Draw Note
        // for (const t of this.notes) {
        //     let buttonArea = document.getElementById('toolbarDiv')
        //     let button = document.createElement('button')
        //     button.type = 'button'
        //     button.style.position = 'relative'
        //     button.id = 'noteButton'
        //     button.style.backgroundColor = 'white'
        //     buttonArea.appendChild(button)
        //     t.setElementID('noteButton')

        //     let self = this
        //     document.getElementById('noteButton').onclick = function () {

        //             const x = createNote()
        //             self.selected.newNote(x)
        //             self.toolbarGraph.newNote(x)
        //             self.toolbarGraph.draw()


        //     this.tools.push(t.getPrototype())
        //     x.draw()
        // }
    }
}
