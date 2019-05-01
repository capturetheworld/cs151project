function createProperties(){
    toolCount = 0
    buttons = []

    return {
        
        draw: (selected)=> {
            // draws menu
            const canvas = document.getElementById('graphpanel')
            const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
            ctx.fillStyle = 'lightgrey'
            ctx.fillRect(0, 210, 400, 40);
            
            console.log("drawing props")
            console.log(selected)


        },
        
    }
}

