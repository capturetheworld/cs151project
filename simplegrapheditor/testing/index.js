

function createProp(text){
    
    // create prop wrapper
    let prop = document.createElement('div')
    prop.className = "prop"
    
    // label and input
    //let text = document.createTextNode("test")
    let label = document.createElement('p')
    label.className = "label"
    label.innerHTML = text
    
    let inp = document.createElement('input')
    inp.type = "text"
    inp.className = "input"

    prop.appendChild(label)
    prop.appendChild(inp)

    return prop
    
}

function saveProperties() {
    // takes properties and applies setters to all values
    console.log("submitted")

}


document.addEventListener('DOMContentLoaded', function () {
    
    let container = document.getElementById('propertySheetWrapper')
    let form = document.createElement('form')
    
    prop1 = createProp("height")
    prop2 = createProp("widfafdfath")
    prop3 = createProp("color")
    
    let submit = document.createElement("input")
    submit.setAttribute('type', "submit")
    submit.setAttribute('value', "Apply")
    submit.className = "apply"
    

    form.appendChild(prop1)
    form.appendChild(prop2)
    form.appendChild(prop3)
    form.appendChild(submit)

    container.appendChild(form)
    form.setAttribute('onsubmit', "saveProperties()")
    
})