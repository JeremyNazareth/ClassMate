let blocks = [];

document.addEventListener("DOMContentLoaded", function(){        
    let storedBlocks = sessionStorage.getItem('blocks');
    blocks = storedBlocks ? JSON.parse(storedBlocks) : []; 
    showBlocks();
    showActivities();
    showGrades();
    showNotes();
});


function showBlocks(){
    let dataContainer = document.getElementById('data-container');
    let noDataContainer = document.getElementById('no-data-container');
    let blocksDiv = document.getElementById('blocks-table-body');    
    blocksDiv.innerHTML = "";
    
    if (blocks.length === 0){
        noDataContainer.style.display = 'block';
        dataContainer.style.display = 'none';
    } else{
        noDataContainer.style.display = 'none';
        dataContainer.style.display = 'flex';
        blocks.forEach((block, index) => {
            let blockDiv = document.createElement('tr');
            blockDiv.className = 'block-container';
            blockDiv.innerHTML = `
            <tr>
                <td>${block.name}</td>
                <td>${block.description}</td>
            </tr>

            `;
            blocksDiv.appendChild(blockDiv);    
        });    
    }
    

    
    
}

function showActivities(){
    let activities = [];
    let activitiesMainContainer = document.getElementById('activities-container');
    let activitiesContainer = document.getElementById('activities-table-body');
    
    blocks.forEach((block, index) =>{
        block.tasks.forEach(task =>{
            activities.push(task);
        })
        
    });

    if (activities.length === 0){
        activitiesMainContainer.style.display = 'none';
    } else{
        
        activitiesMainContainer.style.display = 'flex';
    }
    
    activities.sort((a, b ) => new Date(a.endTask) - new Date(b.endTask));

    activities.forEach((activity, index) => {
        let activityDiv = document.createElement('tr');
        const endDate = new Date(activity.endTask);
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
        } else if (daysLeft > 3) {
            statusText = `Quedan ${daysLeft} días`;
            statusClass = 'status-orange';
            taskColor = 'background-color: #fff3cd;'; // Amarillo claro
        } else if (daysLeft < 2 && daysLeft > 0) {
            console.log("menos q 2");
            statusText = `Quedan ${daysLeft} días`;
            statusClass = 'status-orange';
            taskColor = 'background-color: #fff3cd;'; // Amarillo claro
        } else {
            console.log("ven");
            statusText = '¡Vencido!';
            statusClass = 'status-red';
            taskColor = 'background-color: #f8d7da;'; // Rojo claro
        }
        
        activityDiv.style = taskColor;
        activityDiv.innerHTML = `
            <tr>
                <td>${activity.name}</td>
                <td>${activity.startTask}</td>
                <td>${activity.endTask}%</td>
                <td>${statusText}</td>
            </tr>                
        `;
        activitiesContainer.appendChild(activityDiv);
    });

}

function showGrades(){
    let grades = [];
    let gradesMainContainer = document.getElementById('grades-container');
    let gradesContainer = document.getElementById('grades-table-body');


    blocks.forEach(block =>{
        block.grades.forEach ((grade, index) =>{
            let gradeTr = document.createElement('tr');
            gradeTr.innerHTML = `
            <tr>
                <td>${block.name}</td>
                <td>${block.grades[index].name}</td>
                <td>${block.grades[index].grade}</td>
                <td>${block.grades[index].ponderation}%</td>
                
            </tr>
            `;
            gradesContainer.appendChild(gradeTr);
            grades.push(grade);
            console.log("Se agregó " + grade + " a la lista.")
        })
        
    });
    

    if(grades.length === 0){        
        gradesMainContainer.style.display = 'none';
    } else {
        gradesMainContainer.style.display = 'flex';
         
    }
}

function showNotes(){
    let notes = [];
    let notesMainContainer = document.getElementById('notes-container');
    let notesContainer = document.getElementById('notes-table-body');

    blocks.forEach((block, index) =>{
        block.notes.forEach(note =>{
            notes.push(note);
        })
        
    });

    if(notes.length === 0){        
        notesMainContainer.style.display = 'none';
    } else {
        notesMainContainer.style.display = 'flex';

        notes.forEach(note =>{
            noteDiv = document.createElement('tr');
            noteDiv.className = 'list-group-item';
            noteDiv.innerHTML = `
                <tr>
                    <td>
                        ${note.title}
                    </td>
                    
                </tr>
                
            `;
            notesContainer.appendChild(noteDiv);
        })
    }
}