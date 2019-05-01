function createProperties(){
    toolCount = 0
    buttons = []

    return {
        
        draw: (selected) => {
            // draws menu
            const canvas = document.getElementById('graphpanel')
            const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
            ctx.fillStyle = 'lightgrey'
            ctx.fillRect(0, 210, 400, 40);
            
            console.log("\n\n\n")
            let props = selected.getAttributes()
            console.log(props.length)
            for(i = 0; i < props.length; i+=2){
                
                ctx.fillStyle = "black"
                ctx.fillText(props[i](), i * 13 + 50, 230)
            }

            props = []
        },
        
    }
}

