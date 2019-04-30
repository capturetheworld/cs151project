class Toolbar {
    constructor() {
        this.nodes = []
        this.edges = []

        const n1 = createNode(14, 7, 0, 'white', 'button', '', '')
        this.nodes.push(n1)
        const e1 = createLineEdge()
    }

    /* A button factory function. Will return a button object. Feel free to change. */
    createNewButton(x, y){

        const width = 40
        const height = 30
        
        return({
      
            getBounds: () => {
                
            },
      
            // For now, outputs "Clicked" to console when clicked
            contains: (point) => {
      
                let diffx = Math.abs(point.x - (x + width/2))
                let diffy = Math.abs(point.y - (y + height/2))
                if(diffx < width/2 && diffy < height/2){
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