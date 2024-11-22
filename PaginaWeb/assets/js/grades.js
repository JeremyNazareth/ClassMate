const gradesContainer = document.getElementById('grades-container');
const averageResult = document.getElementById('averageResult');
const examResult = document.getElementById('examResult');

// Función para agregar una nueva nota
function addNoteBtn (){
    const noteCount = gradesContainer.getElementsByClassName('note-entry').length + 1;
    const noteEntry = document.createElement('div');
    noteEntry.classList.add('note-entry');
    noteEntry.innerHTML = `
        <label for="nota${noteCount}">Nota ${noteCount}</label>
        <input type="text" class="nota">
        <input type="text" class="ponderacion"> %
        
    `;
    gradesContainer.appendChild(noteEntry);
};

// Función para eliminar la última nota
function deleteNoteBtn(){
    const noteEntries = gradesContainer.getElementsByClassName('note-entry');
    if (noteEntries.length > 1) {
        gradesContainer.removeChild(noteEntries[noteEntries.length - 1]);
    }
};

// Función para calcular el promedio de notas
function calculateBtn(){
    const notes = document.getElementsByClassName('nota');
    const ponderaciones = document.getElementsByClassName('ponderacion');
    let totalWeightedScore = 0;
    let totalWeight = 0;

    for (let i = 0; i < notes.length; i++) {
        const noteValue = parseFloat(notes[i].value);
        const weightValue = parseFloat(ponderaciones[i].value);

        if (!isNaN(noteValue) && !isNaN(weightValue)) {
            totalWeightedScore += noteValue * (weightValue / 100);
            totalWeight += weightValue;
        }
    }

    const promedio = totalWeight > 0 ? (totalWeightedScore / (totalWeight / 100)).toFixed(2) : 0;
    averageResult.textContent = `Promedio de notas = ${promedio}`;

    // Cálculo de la nota necesaria en el examen para aprobar
    const notaAprobacion = parseFloat(document.getElementById('nota-aprobacion').value);
    const ponderacionExamen = parseFloat(document.getElementById('ponderacion-examen').value);
    const notaNecesaria = ((notaAprobacion - (promedio * (1 - (ponderacionExamen / 100)))) / (ponderacionExamen / 100)).toFixed(2);

    examResult.textContent = `Necesitarás un ${notaNecesaria} en el examen final para aprobar el curso.`;
};
