
let blocks = [];
document.addEventListener("DOMContentLoaded", function(){    
    blocks = JSON.parse(sessionStorage.getItem('blocks'));
    showBlocks();
});


function showBlocks(){
    let blocksDiv = document.getElementById('blocks-container');    
    console.log(blocks);
    console.log();
    blocksDiv.innerHTML = "";
    
    blocks.forEach((block, index) => {
        let blockDiv = document.createElement('div');
        console.log(block.name);
        blockDiv.className = 'block-container';
        blockDiv.innerHTML = `
        <li class="list-group-item">
            ${block.name}
        </li>
        `;
        blocksDiv.appendChild(blockDiv);    
    });

    
    
}