//this variable is added later to assign an id to a new block.
let idCount = 0;
const blocks = [];
//this fuction is used by the create button on blocks.html.
function createblock () {

    //we create the variables that are used for retrieve the data from the labels.
    const labelName = document.getElementById('labelName').value;
    const labelDescription = document.getElementById('labelDescription').value;

    //statement to only create the block if the labels name and description aren't empty.
    if (labelName && labelDescription){
        //we increment by one the track of the ids and we create the new block with the new parameters from the labels.
        const id = `${idCount++}`;
        const newBlock = new Block(id,labelName,labelDescription)
        blocks.push(newBlock);
        //We retrieve the data for output purposes.
        document.getElementById('idOutput').textContent = newBlock.id;
        document.getElementById('nameOutput').textContent = newBlock.name;
        document.getElementById('descriptionOutput').textContent = newBlock.description;
        showBlocks();
    } else{
        alert('Complete los campos.'); //alert if the labels are empty.
    }
}

function showBlocks(){

    const blockContainer = document.getElementById('blocksContainer');
    
    blockContainer.innerHTML= '';

    blocks.forEach (block =>
    {
        const blockDiv = document.createElement('div')
        blockDiv.classList.add('blockContainer');
        blockDiv.classList.add('block');
        blockDiv.innerHTML = `
        <div class="container">
            <div class="blockOutput">
                <h2>
                    Bloque ${block.name}
                </h2>
                <div class="blockText">                    
                    <form>
                        <table>
                            <tr>
                                <td class="labelText">
                                    <label>
                                        Id:
                                    </label>
                                </td>
                                <td>
                                    ${block.id}
                                </td>                            
                            </tr>
                            <tr>
                                <td class="labelText">
                                    <label class="labelText">
                                        Descripción:
                                    </label>
                                </td>
                                <td class="labelOutput">
                                    ${block.description}
                                </td>
                            </tr>
                            </label>
                        </table>
                    </form>
                </div>
                <button class="btn btn-danger" onclick="deleteBlock('${block.id}')">Eliminar</button>
            </div>
            
        </div>`;
        blockContainer.appendChild(blockDiv);
    }
    );
}

function deleteBlock(id){

    const index = blocks.findIndex(block => block.id === id);

    if (index !== -1) {
        blocks.splice(index, 1);
        showBlocks(); 
    }
}