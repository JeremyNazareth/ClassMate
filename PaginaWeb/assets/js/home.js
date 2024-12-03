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
    let blocksDiv = document.getElementById('blocks-container');    
    blocksDiv.innerHTML = "";
    
    if (blocks.length === 0){
        noDataContainer.style.display = 'block';
        dataContainer.style.display = 'none';
    } else{
        noDataContainer.style.display = 'none';
        dataContainer.style.display = 'flex';
        blocks.forEach((block, index) => {
            let blockDiv = document.createElement('div');
            blockDiv.className = 'block-container';
            blockDiv.innerHTML = `
            <li class="list-group-item" block>
                <h4>Bloque: ${block.name}</h4>
                <h4>Descripción: ${block.description}</h4>
            </li>
            `;
            blocksDiv.appendChild(blockDiv);    
        });    
    }
    

    
    
}

function showActivities(){
    let activities = [];
    let activitiesMainContainer = document.getElementById('activities-main-container');
    let activitiesContainer = document.getElementById('activities-container');
    
    blocks.forEach((block, index) =>{
        block.tasks.forEach(task =>{
            activities.push(task);
        })
        
    });

    if (activities.length === 0){
        activitiesMainContainer.style.display = 'none';
    } else{
        
        activitiesMainContainer.style.display = 'block';
    }
    
    activities.sort((a, b ) => new Date(a.endTask) - new Date(b.endTask));

    activities.forEach((activity, index) => {
        let activityDiv = document.createElement('li');
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
            statusText = `Quedan ${daysLeft} días`;
            statusClass = 'status-orange';
            taskColor = 'background-color: #fff3cd;'; // Amarillo claro
        } else {
            statusText = '¡Vencido!';
            statusClass = 'status-red';
            taskColor = 'background-color: #f8d7da;'; // Rojo claro
        }
        activityDiv.className = "list-group-item";
        activityDiv.style = taskColor;
        activityDiv.innerHTML = `
        <h4>Actividad: ${activity.name}</h4>
        <h4>Fecha de inicio: ${activity.startTask}</h4>
        <h4>Fecha de termino: ${activity.endTask}</h4>
        <h4>Quedan ${daysLeft} Días</h4>
        `;
        activitiesContainer.appendChild(activityDiv);
    });

}

function showGrades(){
    let grades = [];
    let gradesMainContainer = document.getElementById('grades-main-container');
    let gradesContainer = document.getElementById('grades-container');


    blocks.forEach(block =>{
        block.grades.forEach (grade =>{
            grades.push(grade);
            console.log("Se agregó " + grade + " a la lista.")
        })
        
    });
    

    if(grades.length === 0){        
        gradesMainContainer.style.display = 'none';
    } else {
        gradesMainContainer.style.display = 'block';
        blocks.forEach((block, index) => {
            let gradeMainDiv = document.createElement('li');
            let gradeNameDiv = document.createElement('div');
            let gradeDiv = document.createElement('div');

            gradeMainDiv.className = 'list-group-item';
            gradeDiv.style.display = 'flex';
            gradeNameDiv.innerHTML = `
            <h4>Bloque: ${block.name}</h4>
            `;

            gradeMainDiv.appendChild(gradeNameDiv);
            
            block.grades.forEach(grade =>{
                let gradeDataDiv = document.createElement('div');
                gradeDataDiv.innerHTML = '';
                gradeDataDiv.innerHTML = `
                <div style="display: flex;">
                    <h5> ${grade.name}:&nbsp;</h5>
                    <h5 style="font-weight: normal;">${grade.grade}, ${grade.ponderation}% &nbsp;</h5>
                <div>
                `;
                gradeDiv.appendChild(gradeDataDiv);
                
            })

            gradeMainDiv.appendChild(gradeDiv);
            gradesContainer.appendChild(gradeMainDiv);    

            
        });  
    }
}

function showNotes(){
    let notes = [];
    let notesMainContainer = document.getElementById('notes-main-container');
    let notesContainer = document.getElementById('notes-container');

    blocks.forEach((block, index) =>{
        block.notes.forEach(note =>{
            notes.push(note);
        })
        
    });

    if(notes.length === 0){        
        notesMainContainer.style.display = 'none';
    } else {
        notesMainContainer.style.display = 'block';

        notes.forEach(note =>{
            noteDiv = document.createElement('li');
            noteDiv.className = 'list-group-item';
            noteDiv.innerHTML = `
                <h4>Apunte: ${note.title}</h4>
            `;
            notesContainer.appendChild(noteDiv);
        })
    }
}