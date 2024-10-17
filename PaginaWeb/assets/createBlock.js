//this variable is added later to assign an id to a new block.
let idCount = 0;

//this fuction is used by the create button on blocks.html.
function createblock () {

    //we create the variables that are used for retrieve the data from the labels.
    const labelName = document.getElementById('labelName').value;
    const labelDescription = document.getElementById('labelDescription').value;

    //statement to only create the block if the labels name and description aren't empty.
    if (labelName && labelDescription){
        //we increment by one the track of the ids and we create the new block with the new parameters from the labels.
        const id = `blockId-${idCount++}`;
        const newBlock = new Block(id,labelName,labelDescription)
        //We retrieve the data for output purposes.
        document.getElementById('idOutput').textContent = newBlock.id;
        document.getElementById('nameOutput').textContent = newBlock.name;
        document.getElementById('descriptionOutput').textContent = newBlock.description;

    } else{
        alert('Complete los campos.'); //alert if the labels are empty.
    }
}
