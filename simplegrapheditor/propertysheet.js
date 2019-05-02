function createPropertySheet(){  
    let object = undefined
    let form =  document.createElement("form")
    let getters = []
    let setters = []

    return {  

        setObj: (obj) => {
            // fetches functions (getters & setters) from 
            let attributes = obj.getAttributes()

            // gets property getters from evens
            getters = []
            for(i = 0; i < attributes.length; i+=2){propertyGetters.push(attributes[i])}

            // gets property setters from odds
            setters = []
            for(i = 1; i < attributes.length; i+=2){setters.push(attributes[i])}

            // clears old input elements
            while(form.firstChild){
                form.removeChild(form.firstChild)
            }
            
            // creates text input
            for(i = 1; i < getters.length; i++){
                let input = document.createElement("input")
                // will need to check type before this. text by default
                input.type = "text"
                
                form.appendChild(input)
            }
        },

        draw: (selected) => {
            
            const canvas = document.getElementById('graphpanel')
            const ctx = canvas.getContext('2d'); // No need for "if (canvas.getContext)"
            ctx.fillStyle = 'lightgrey'
            ctx.fillRect(0, 210, 400, 40);
            

        },
    }
}



/*
propertySheet
    obj - object being modified
    getters
    setters

    draw()          renders all text inputs
    refill(obj)     a new object has been selected



*/
circle = {
    color: "green",
    size: 20,
    getSize: () => {return size},
    setSize: (s) => {size = s},
    getColor: () => {return color},
    setColor: (c) => {color = c},
    getAttributes(){
        return[
            this.getSize, this.setSize,
            this.getColor, this.setColor
        ]
    }
}


//createProperties(circle)