let selectedBlock;
document.addEventListener("DOMContentLoaded", function() {
    
    const selectedBlockData = JSON.parse(sessionStorage.getItem('selectedBlock'));    
    //Variables for data from Block selected
    selectedBlock = new Block (selectedBlockData.id,selectedBlockData.name,selectedBlockData.description,selectedBlockData.grades)    
    console.log(selectedBlockData);
    console.log(selectedBlock);
    let nameBlock = document.getElementById('nameSelectedBlock');
    let descriptionBlock = document.getElementById('descriptionSelectedBlock');    
    //To print the data of the JSON Block
    nameBlock.textContent = `${selectedBlock.name}`;
    descriptionBlock.textContent = `${selectedBlock.description}`;
    showGrades();

});

    //recuperamos los datos del formulario

function addingGrade(){
    
    const gradeName = document.getElementById('gradeName').value;
    const grade = document.getElementById('grade').value;
    const ponderation = document.getElementById('ponderation').value;
    selectedBlock.addGrade(gradeName,grade,ponderation);
    
    saveBlockToSessionStorage();
    showGrades();
    event.preventDefault();
}

function removingGrade(index){    
    selectedBlock.removeGrade(index)
    showGrades();
    saveBlockToSessionStorage();
}
function showGrades(){
    // Verificar si selectedBlock tiene calificaciones
    const gradesContainer = document.getElementById('gradesContainer');
    gradesContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos
    
    if (selectedBlock && selectedBlock.grades.length > 0) {
        selectedBlock.grades.forEach((grade, index) => {
            // Crear un contenedor para cada nota
            const gradeDiv = document.createElement('div');
            gradeDiv.className = 'grade';
            gradeDiv.innerHTML = `
                <h3 style="width: 100%; margin-bottom: 5px;">${grade.name}</h3>
                <p style="width: 50%;">${grade.grade}</p>
                <p style="width: 50%;">${grade.ponderation}%</p>
                <button class="btn btn-danger" onclick = "removingGrade(${index})"> Eliminar nota</button>
            `;

            gradesContainer.appendChild(gradeDiv);
        });
    } else {
        // Si no hay calificaciones, mostrar un mensaje vacío
        gradesContainer.innerHTML = '<p class="text-danger">No hay calificaciones para mostrar.</p>';
    }
}

function saveBlockToSessionStorage() {

    if (selectedBlock) {
        const block = blocks.find(b => b.id === selectedBlock.id)
        block.grades = selectedBlock.grades
        sessionStorage.setItem('blocks', JSON.stringify(blocks));
    } else {
        console.error('selectedBlock no está definido.');
    }
}


