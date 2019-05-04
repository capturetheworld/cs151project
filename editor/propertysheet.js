function createProp(text, id){
    
    // create prop wrapper
    let prop = document.createElement('div')
    prop.className = "prop"
    
    // label and input
    //let text = document.createTextNode("test")
    let label = document.createElement('p')
    label.className = "label"
    label.innerHTML = id
    
    let inp = document.createElement('input')
    inp.type = "text"
    inp.value = text
    inp.className = "input"
    

    prop.appendChild(label)
    prop.appendChild(inp)
    prop.id = id
    
    return prop
    
}

function createPropertySheet(){
    let container = document.getElementById('propertySheetWrapper')
    let form = document.createElement('form')
    form.setAttribute.id = "form"
    let getters = []
    let setters = []

    saveProperties = function(){console.log("init save prop")}

    let submit = document.createElement('button')
    submit.setAttribute('onclick', "saveProperties()")
    submit.className = "apply"
    submit.innerHTML = "Save"
    container.appendChild(form)
    container.appendChild(submit)
    
    return {
        // called when an object is selected
        setObj: (obj) => {
            // fetches functions (getters & setters) from obj
            let attributes = obj.getAttributes()

            // gets property getters from evens
            getters = []
            for(i = 0; i < attributes.length; i+=2){getters.push(attributes[i])}

            
            // gets property setters from odds
            setters = []
            for(i = 1; i < attributes.length; i+=2){setters.push(attributes[i])}

            // clears old input elements
            while(form.firstChild){
                form.removeChild(form.firstChild)
            }
            
            
            // removes old submit button
            while(container.submit){
                container.removeChild(submit)
            }

            submit = document.createElement('button')
            submit.setAttribute('onclick', "saveProperties()")
            submit.className = "apply"

            // creates text input
            for(i = 0; i < getters.length; i++){
                // get label text: splice function name
                let functName = getters[i].name
                let label = functName.substring(3, functName.length)
                
                let input = createProp(getters[i](), label)
                form.appendChild(input)
            }
            console.log("new save props")
            
            this.saveProperties = function(){  
                // goes through setters array and 
                for(i = 0; i < setters.length; i++){
                    let functName = setters[i].name
                    // slices 'Color' from 'getColor()'
                    let label = functName.substring(3, functName.length)
                    input = document.getElementById(label)
                    setters[i](input.lastChild.value)

                }
            }

        },
    }
}
