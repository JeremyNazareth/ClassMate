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

        document.getElementById('idOutput').textContent = blocks[id].id;
        document.getElementById('nameOutput').textContent = blocks[id].name;
        document.getElementById('descriptionOutput').textContent = blocks[id].description;

    } else{
        alert('Complete los campos.');
    }
}
