let selectedBlock;
console.log(sessionStorage.getItem('selectedBlock'));

document.addEventListener("DOMContentLoaded", function() {
    
    const selectedBlockData = JSON.parse(sessionStorage.getItem('selectedBlock'));
    console.log(selectedBlockData)
    console.log(selectedBlockData.name)
    //Variables for data from Block selected
    selectedBlock = new Block (selectedBlockData.id,selectedBlockData.name,selectedBlockData.description,selectedBlockData.grades)
    console.log(selectedBlock)
    let nameBlock = document.getElementById('nameSelectedBlock');
    let descriptionBlock = document.getElementById('descriptionSelectedBlock');    
    //To print the data of the JSON Block
    nameBlock.textContent = `${selectedBlock.name}`;
    descriptionBlock.textContent = `${selectedBlock.description}`;

});

    //recuperamos los datos del formulario

function addingGrade(){
    
    const gradeName = document.getElementById('gradeName').value;
    const grade = document.getElementById('grade').value;
    const ponderation = document.getElementById('ponderation').value;
    console.log(gradeName,grade,ponderation);
    console.log(selectedBlock); 
    selectedBlock.addGrade(gradeName,grade,ponderation);
    saveBlockToSessionStorage();
    showGrades();
    event.preventDefault();
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
                <button class="btn btn-danger"> Eliminar nota</button>
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
        sessionStorage.setItem('selectedBlock', JSON.stringify(selectedBlock));
    } else {
        console.error('selectedBlock no está definido.');
    }
    console.log(sessionStorage.getItem('selectedBlock'));
}


