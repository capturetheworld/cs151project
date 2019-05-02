

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
            }
        },

        draw: (nodeDraw) => {
            const canvas = document.getElementById('graphPanel')
            const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
            ctx.nodeDraw()
            ctx.fillRect(x, y, width, height)
            
        }
    })
}