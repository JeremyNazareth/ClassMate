// Agregar una nueva tarea
function addTask(description = 'Nueva Tarea', startDate = '', endDate = '') {
    const task = document.createElement('div');
    task.className = 'task';

    task.innerHTML = `
        <div class="task-header">
            <input type="text" value="${description}" onblur="updateTask()" />
            <button onclick="deleteTask(this)" class="btn btn-danger">Eliminar</button>
        </div>
        <div class="date-container">
            <label>
                <span>Inicio:</span>
                <input type="date" value="${startDate}" onchange="updateTask()" />
            </label>
            <label>
                <span>Fin:</span>
                <input type="date" value="${endDate}" onchange="updateTask()" />
                <span class="status"></span>
            </label>
        </div>
    `;

    taskList.appendChild(task);
    updateTask(); // Actualizar estado al agregar
    saveTasks(); // Guardar estado actualizado
}

// Actualizar una tarea
function updateTask() {
    document.querySelectorAll('.task').forEach(task => {
        const dateInputs = task.querySelectorAll('input[type="date"]');
        const startDateInput = dateInputs[0]; // Primer input (fecha de inicio)
        const endDateInput = dateInputs[1]; // Segundo input (fecha de fin)
        const statusSpan = task.querySelector('.status');
        const currentDate = new Date(); // Fecha actual del usuario

        // Verificar si existen los inputs de fecha
        if (startDateInput && endDateInput) {
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
    saveTasks(); // Guardar las tareas después de actualizar
}

function deleteTask(button) {
    button.parentElement.parentElement.remove(); // Elimina la tarea del DOM
    saveTasks(); // Guardar estado actualizado
}