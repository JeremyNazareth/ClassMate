document.addEventListener('DOMContentLoaded', () => {
    const savedBlocks = sessionStorage.getItem('blocks');
    if (savedBlocks) {
        // Si existen datos guardados, conviértelos a objetos y cárgalos en el array `blocks`
        blocks.push(...JSON.parse(savedBlocks));
        // Muestra los bloques recuperados en la interfaz
        showBlocks();
    }
});
//this variable is added later to assign an id to a new block.
let idCount = 0;
const blocks = [];
//this fuction is used by the create button on blocks.html.
function createblock (event) {
    event.preventDefault();
    //we create the variables that are used for retrieve the data from the labels.
    const labelName = document.getElementById('labelName').value;
    const labelDescription = document.getElementById('labelDescription').value;

    //statement to only create the block if the labels name and description aren't empty.
    if (labelName && labelDescription){
        //we increment by one the track of the ids and we create the new block with the new parameters from the labels.
        const id = `${idCount++}`;
        const newBlock = new Block(id,labelName,labelDescription)
        blocks.push(newBlock);
        //we convert the array in JSON and save it in a sessionStorage
        sessionStorage.setItem('blocks', JSON.stringify(blocks));
        showBlocks();
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
                <button class="btn btn-primary" style="margin-top:10px;" onclick="redirectToDetails('${block.id}')" margin-right: 15px;">Ver bloque</button>
                <button class="btn btn-danger" style="margin-top:10px;" onclick="deleteBlock('${block.id}')">Eliminar</button>
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
        sessionStorage.setItem('blocks', JSON.stringify(blocks));
        showBlocks(); 
    }
}

function redirectToDetails(blockId){
    const block = blocks.find(b => b.id === blockId);
    sessionStorage.setItem("selectedBlock",JSON.stringify(block));
    window.location.href = `blockDetails.html`;
}

function consoleDebug(){
    console.log(sessionStorage);
    console.log(blocks);
    console.log(sessionStorage.getItem("selectedBlock"));
}