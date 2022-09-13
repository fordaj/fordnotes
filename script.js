function renderInput(name){
    let elements = document.getElementsByClassName(name)
    let input = elements[0]
    for(var i = 1; i < elements.length; i++) {
        elements[i].innerHTML = input.value;
    }
}

function toggleDisplay(x)
{
    if (document.getElementById(x).style.display == 'block') {
		document.getElementById(x).style.display = 'none';
	} else {
		document.getElementById(x).style.display = 'block';
	}
    console.log('hey')
}

function copy(element)
{
    var str = element;
    window.getSelection().selectAllChildren(str);
    document.execCommand("Copy")
}