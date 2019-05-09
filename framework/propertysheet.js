
/**
 * Factory function to create the individual dropdown property divs to populate
 * the property sheet form.
 * 
 * @param {object} obj - object containing dropdown options
 * @param {string} id - used for property label and get/set function names 
 */

function createPropDropdown(obj, id){
    // create prop wrapper
    let prop = document.createElement('div')
    prop.className = "prop"
    
    // label and menu
    let label = document.createElement('p')
    label.className = "label"
    label.innerHTML = id
    
    let menu = document.createElement('select')
    menu.className = "inputdrop"
    menu.id = 'dropdown'

    for(opt in obj){
        if(opt != 'current'){
            // creates option for dropdown
            let option = document.createElement('option')
            option.innerHTML = opt
            option.value = opt
            menu.appendChild(option)
            
            // sets selected value
            if(obj.current == opt){               
                menu.value = opt
            }
        }
    }

    prop.appendChild(label)
    prop.appendChild(menu)
    prop.id = id
    
    return prop
}


/**
 * Factory function to create the individual property divs to populate
 * the property sheet form.
 * 
 * @param {string} text - the property value
 * @param {string} id - used for property label and get/set function names 
 */

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


/**
 * Factory function to create the property sheet.
 * 
 */
function createPropertySheet(){
    let propGraph = undefined
    let container = document.getElementById('propertySheetWrapper')
    let form = document.createElement('form')
    form.setAttribute.id = "form"
    let getters = []
    let setters = []

    saveProperties = function(){
        console.log("init save prop")
    }

    let submit = document.createElement('button')
    submit.setAttribute('onclick', "saveProperties()")
    submit.className = "apply"
    submit.innerHTML = "Save"
    container.appendChild(form)
    container.appendChild(submit)

    return {
        setGraph: (graph) => {
            propGraph = graph
        },
        /**
         * Called when a new object is selected.
         * Recives and stores all objects getters/setters 
         * 
         * Uses getters to populate current property values
         * Uses setter to enter new property values from input
         */
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
                
                let input = ''
                if(typeof getters[i]() == 'object'){
                    input = createPropDropdown(getters[i](), label)
                }else{
                    input = createProp(getters[i](), label)
                }

                form.appendChild(input)
            }
            this.saveProperties = function(){  
                // goes through setters array 
                for(i = 0; i < setters.length; i++){
                    let functName = setters[i].name
                    // slices 'Color' from 'setColor()'
                    let label = functName.substring(3, functName.length)
                    input = document.getElementById(label)
                    setters[i](input.lastChild.value)
                }
                propGraph.draw()
            }
        },
    }
}
