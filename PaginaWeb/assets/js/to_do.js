const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6A4C93', '#2E86AB'];
let currentTask;

function addColumn() {
    const board = document.getElementById('board');
    const column = document.createElement('div');
    column.className = 'column';

    column.innerHTML = `
        <div class="column-header">
            <input type="text" value="Nueva Materia" onfocus="this.select()" />
            <i class="fas fa-trash delete-column" onclick="deleteColumn(this)"></i>
            <i class="fas fa-plus" onclick="addTask(this)"></i>
        </div>
    `;

    board.appendChild(column);
}

function addTask(icon) {
    const column = icon.closest('.column');
    const task = document.createElement('div');
    task.className = 'task';

    const color = colors[Math.floor(Math.random() * colors.length)];
    task.style.borderTopColor = color;

    task.innerHTML = `
        <div class="task-content">Nueva Tarea</div>
        <i class="fas fa-trash delete-task" onclick="deleteTask(this)"></i>
        <div class="date-container">
            <button onclick="openDateModal(this)">Fecha Inicio y Fin</button>
            <button class="status-btn" style="background-color: gray;" onclick="updateTaskStatus(this)">Estado</button>
        </div>
    `;

    task.onclick = function() {
        editTaskDescription(task);
    };

    column.appendChild(task);
}

function deleteTask(taskIcon) {
    const task = taskIcon.closest('.task');
    task.remove();
}

function deleteColumn(columnIcon) {
    const column = columnIcon.closest('.column');
    column.remove();
}

function editTaskDescription(task) {
    if (!task.querySelector('.description-input')) {
        const description = task.querySelector('.task-content').textContent;
        const descriptionInput = document.createElement('textarea');
        descriptionInput.className = 'description-input';
        descriptionInput.value = description;
        descriptionInput.onblur = function() {
            saveDescription(task, descriptionInput);
        };
        task.querySelector('.task-content').replaceWith(descriptionInput);
        descriptionInput.focus();
    }
}

function saveDescription(task, input) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'task-content';
    descriptionDiv.textContent = input.value || 'Nueva Tarea';
    descriptionDiv.onclick = function() {
        editTaskDescription(task);
    };
    input.replaceWith(descriptionDiv);
}

function openDateModal(button) {
    currentTask = button.closest('.task');
    document.getElementById('dateModal').style.display = 'block';
}

function saveDates() {
    const startDate = document.getElementById('startDateInput').value;
    const endDate = document.getElementById('endDateInput').value;

    if (startDate && endDate) {
        currentTask.querySelector('.date-container button').textContent = `Inicio: ${startDate} / Fin: ${endDate}`;
        document.getElementById('dateModal').style.display = 'none';
        updateTaskStatus(currentTask.querySelector('.status-btn'));
    }
}

function updateTaskStatus(button) {
    if (currentTask) {
        const startDate = new Date(currentTask.querySelector('.date-container button').textContent.split(" / Fin: ")[1]);
        const currentDate = new Date();
        const daysLeft = Math.floor((startDate - currentDate) / (1000 * 3600 * 24));

        if (daysLeft > 7) {
            button.style.backgroundColor = 'green';
        } else if (daysLeft <= 7 && daysLeft > 3) {
            button.style.backgroundColor = 'yellow';
        } else if (daysLeft <= 3) {
            button.style.backgroundColor = 'red';
        }
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('dateModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
