function renderInput(name){
    let elements = document.getElementsByClassName(name)
    let input = elements[0]
    for(var i = 1; i < elements.length; i++) {
        elements[i].innerHTML = input.value;
    }
}