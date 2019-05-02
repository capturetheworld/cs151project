
function createNewButton(pos){

    const width = 40
    const height = 30
    let y = height/2
    let x = pos * width + 10
    return({

        getBounds: () => {
            
        },

        contains: (point) => {

            let diffx = Math.abs(point.x - (x + width/2))
            let diffy = Math.abs(point.y - (y + height/2))
            if(diffx < width/2 && diffy < height/2){
                console.log("clicked")
            }
        },

        draw: () => {
            //console.log("x: " + x + ", y: " + y)
            const canvas = document.getElementById('graphpanel')
            const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
            //ctx.nodeDraw()
            ctx.strokeRect(x, y, width, height)
            
        }
    })
}


function createToolbar(){
    toolCount = 0
    buttons = []

    return {
        addButton: ()=> {
            buttons.push(createNewButton(buttons.length))
            //toolCount += 1
        },

        draw: ()=> {

            const canvas = document.getElementById('graphpanel')
            const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
            
            ctx.fillRect(500, 25, 1000, 50)
            ctx.fillStyle = 'pink'
            
            for(i = 0; i < buttons.length; i++){buttons[i].draw()}
        }
    }
}

/*
document.addEventListener('DOMContentLoaded', function () {
    //Create Toolbar
    const toolbar = createToolbar()
    //const button1 = createNewButton(1)
    toolbar.addButton()
    toolbar.addButton()
    toolbar.addButton()
    toolbar.draw()
    const toolbarCanvas = document.getElementById('toolbar')
    //toolbarCanvas.width = window.innerWidth

   

    // const panel = document.getElementById('graphPanel')
    // panel.width = window.innerWidth
    // panel.height = window.innerHeight

   
    let selected = undefined
    let dragStartPoint = undefined
    let dragStartBounds = undefined

    function repaint() {
        panel.innerHTML = ''
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
            //Right click
            window.oncontextmenu = function () {
                prompt('Node', 'Name', 'Attributes')
                return false     // cancel default menu
            }
        }
        repaint()
    })

    panel.addEventListener('mousemove', event => {
        if (dragStartPoint === undefined) return
        let mousePoint = mouseLocation(event)
        if (selected !== undefined) {
            const bounds = selected.getBounds();

            selected.translate(
                dragStartBounds.x - bounds.x +
                mousePoint.x - dragStartPoint.x,
                dragStartBounds.y - bounds.y +
                mousePoint.y - dragStartPoint.y);
            repaint()
        }
    })

    panel.addEventListener('mouseup', event => {
        dragStartPoint = undefined
        dragStartBounds = undefined
    })
    
})
*/
