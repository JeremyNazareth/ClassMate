let selectedBlock;
document.addEventListener("DOMContentLoaded", function() {
    
    const selectedBlockData = JSON.parse(sessionStorage.getItem('selectedBlock'));    
    //Variables for data from Block selected
    selectedBlock = new Block (selectedBlockData.id,selectedBlockData.name,selectedBlockData.description,selectedBlockData.grades,selectedBlockData.tasks, selectedBlockData.notes)    
    let nameBlock = document.getElementById('nameSelectedBlock');
    let descriptionBlock = document.getElementById('descriptionSelectedBlock');    
    //To print the data of the JSON Block
    nameBlock.innerHTML = `
    <h1>Bloque: ${selectedBlock.name}</h1>
    `;
    descriptionBlock.innerHTML = `
    <h1>Descripción: ${selectedBlock.name}</h1>
    `;
    showGrades();
    showActivities();
    showNotes();
    updateTask();

});

    

function addingGrade(){
    
    const gradeName = document.getElementById('gradeName').value;
    const grade = document.getElementById('grade').value;
    const ponderation = document.getElementById('ponderation').value;
    selectedBlock.addGrade(gradeName,grade,ponderation);
    
    saveBlockToSessionStorage();
    showGrades();
    updateTask();
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
    const gpa = document.getElementById('gpa');
    gradesContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos
    let productsSum = 0;
    let ponderationSum = 0;
    
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
            //Grade Point Average
            productsSum += grade.grade * (grade.ponderation / 100);
            ponderationSum += grade.ponderation;
            
            gradesContainer.appendChild(gradeDiv);
        });
        if (ponderationSum === 100) {
            gpa.textContent = `Tu promedio: ${productsSum}`;
        } else{
            gpa.textContent = `Las ponderaciones deben sumar hasta el 100% para tener un promedio.`;
        }
    } else {
        // Si no hay calificaciones, mostrar un mensaje vacío
        gradesContainer.innerHTML = '<p class="text-danger">No hay calificaciones para mostrar.</p>';
    }
}

function saveBlockToSessionStorage() {

    if (selectedBlock) {
        const block = blocks.find(b => b.id === selectedBlock.id)
        block.grades = selectedBlock.grades
        block.tasks = selectedBlock.tasks
        block.notes = selectedBlock.notes
        sessionStorage.setItem('blocks', JSON.stringify(blocks));
        console.log(block);
    } else {
        console.error('selectedBlock no está definido.');
    }
}

function addingActivity (){
    const taskName = document.getElementById("taskName").value;
    const taskStart = document.getElementById("startTask").value;
    const endTask = document.getElementById("endTask").value;
    selectedBlock.addTask(taskName,taskStart,endTask);
    saveBlockToSessionStorage();
    showActivities();
    console.log(selectedBlock.tasks)
}

function removingActivity (index){
    selectedBlock.removeTask(index);
    saveBlockToSessionStorage();
    showActivities();
}
function showActivities(){
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = '';
    
    if (selectedBlock && selectedBlock.tasks.length > 0){
        selectedBlock.tasks.forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            
            // Parse dates
            const endDate = new Date(task.endTask);
            const currentDate = new Date();
            const timeDiff = endDate - currentDate; // Diferencia en milisegundos
            const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convertir a días

            let statusText = '';
            let statusClass = '';
            let taskColor = '';

            // Cambiar color y estado según los días restantes
            if (daysLeft > 5) {
                statusText = 'Tienes tiempo';
                statusClass = 'status-green';
                taskColor = 'background-color: #d4edda;'; // Verde claro
            } else if (daysLeft > 2) {
                statusText = `Quedan ${daysLeft} días`;
                statusClass = 'status-orange';
                taskColor = 'background-color: #fff3cd;'; // Amarillo claro
            } else if (daysLeft < 3 && daysLeft > 0) {
                statusText = `Quedan ${daysLeft} días`;
                statusClass = 'status-orange';
                taskColor = 'background-color: #fff3cd;'; // Amarillo claro
            } else {
                statusText = '¡Vencido!';
                statusClass = 'status-red';
                taskColor = 'background-color: #f8d7da;'; // Rojo claro
            }

            taskDiv.style = taskColor;

            taskDiv.innerHTML = `
            <div class="task-header">
                <div>${task.name}</div>
                <button onclick="removingActivity(${index})" class="btn btn-danger">Eliminar</button>
            </div>
            <div class="date-container">
                <label>
                    <span>Inicio:</span>
                    <div>${task.startTask}</div>
                </label>
                <label>
                    <span>Fin:</span>
                    <div>${task.endTask}</div>
                    <span class="${statusClass}">${statusText}</span>
                </label>
            </div>
            `;
            tasksContainer.appendChild(taskDiv);
        });
    }
}


function updateTask() {
    document.querySelectorAll('.task').forEach(task => {
        const dateInputs = task.querySelectorAll('input[type="date"]');
        const startDateInput = dateInputs[0]; // Primer input (fecha de inicio)
        const endDateInput = dateInputs[1]; // Segundo input (fecha de fin)
        const statusSpan = task.querySelector('.status');
        const currentDate = new Date(); // Fecha actual del usuario
        
        // Verificar si existen los inputs de fecha
        if (startDateInput && endDateInput || selectedBlock.tasks.length > 0) {
            
            // Solo proceder si la fecha de fin está definida
            if (endDateInput.value) {
                const endDate = new Date(endDateInput.value); // Convertir la fecha final en un objeto Date
                const daysLeft = Math.ceil((endDate - currentDate) / (1000 * 3600 * 24)); // Días restantes

                // Asignar color de fondo de la tarea según los días restantes
                if (daysLeft > 7) {
                    task.style.backgroundColor = '#d4edda'; // Verde claro (En plazo)
                    statusSpan.textContent = ' (En plazo)';
                    
                } else if (daysLeft <= 7 && daysLeft > 3) {
                    task.style.backgroundColor = '#fff3cd'; // Amarillo (Pronto)
                    statusSpan.textContent = ' (Pronto)';
                } else if (daysLeft <= 3 && daysLeft >= 0) {
                    task.style.backgroundColor = '#f8d7da'; // Rojo claro (Urgente)
                    statusSpan.textContent = ' (Urgente)';
                    
                } else {
                    task.style.backgroundColor = '#f8d7da'; // Rojo claro (Vencida)
                    statusSpan.textContent = ' (Vencida)';
                }
            } else {
                task.style.backgroundColor = '#f9f9f9'; // Sin color (Sin fecha de fin)
                statusSpan.textContent = '';
            }
        }
    });
    saveBlockToSessionStorage();
}

function selectedBlockLog(){
    console.log(selectedBlock.notes);
};