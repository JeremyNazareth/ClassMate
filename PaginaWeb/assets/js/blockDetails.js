const selectedBlockData = sessionStorage.getItem('selectedBlock');
const selectedBlock = JSON.parse(selectedBlockData);
let nameBlock = document.getElementById('nameSelectedBlock');
let descriptionBlock = document.getElementById('descriptionSelectedBlock');
nameBlock.textContent = `${selectedBlock.name}`;
descriptionBlock.textContent = `${selectedBlock.description}`;
