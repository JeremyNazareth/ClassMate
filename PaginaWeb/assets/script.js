const blocks = {}
let idCount = 0;

function createblock () {

    const name = document.getElementById('blockName').value;
    const description = document.getElementById('blockDescription').value;

    if (name){
        const id = `blockId-${idCount++}`;
        blocks[id] = {
            id: id,
            name: name,
            description: description

        };

        document.getElementById('output').textContent = JSON.stringify
        document.getElementById('nameBlock')

    } else{
        alert('Complete los campos.');
    }
}

document.getElementById('createBlock').addEventListener('click', createBlock);