
let blocks = [];
document.addEventListener("DOMContentLoaded", function(){    
    blocks = JSON.parse(sessionStorage.getItem('blocks'));
    showBlocks();
    showActivities();
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
                <h4>Nombre del bloque: ${block.name}</h4>
                <h4>Descripción del bloque: ${block.description}</h4>
            </li>
            `;
            blocksDiv.appendChild(blockDiv);    
        });    
    }
    

    
    
}

function showActivities(){
    let activities = [];
    let activitiesDataContainer = document.getElementById('activities-data-container');
    let activitiesContainer = document.getElementById('activities-container');
    
    blocks.forEach((block, index) =>{
        block.tasks.forEach(task =>{
            activities.push(task);
        })
        
    });

    if (activities.length === 0){
        activitiesDataContainer.style.display = 'none';
    } else{
        
        activitiesDataContainer.style.display = 'block';
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
        <h4>Nombre de actividad: ${activity.name}</h4>
        <h4>Fecha de inicio: ${activity.startTask}</h4>
        <h4>Fecha de termino: ${activity.endTask}</h4>
        `;
        activitiesContainer.appendChild(activityDiv);
    });

}