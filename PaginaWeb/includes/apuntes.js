let currentSubject = '';

// Función para abrir el modal y cargar los apuntes
function openNotesModal(subject) {
    currentSubject = subject;
    document.getElementById('notesModalLabel').innerText = `Notas de ${subject}`;
    loadNotes();
    const notesModal = new bootstrap.Modal(document.getElementById('notesModal'));
    notesModal.show();
}
// Cargar los apuntes desde localStorage
function loadNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem(`notes_${currentSubject}`)) || [];

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note-item', 'mb-3');
        noteElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <div>${note.content}</div>
                    ${note.image ? `<img src="${note.image}" class="img-fluid mt-2" alt="Imagen del apunte">` : ''}
                    <button class="btn btn-danger btn-sm mt-2" onclick="deleteNote(${index})">Eliminar</button>
                </div>
            </div>
        `;
        notesList.appendChild(noteElement);
    });
}
// Agregar un nuevo apunte
function addNote() {
    const newNoteContent = document.getElementById('newNoteContent').innerHTML;
    const newNoteImageFile = document.getElementById('newNoteImage').files[0];
    
    if (newNoteContent.trim() === '' && !newNoteImageFile) {
        alert('Agrega texto o una imagen para crear un apunte');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
        const newNote = {
            content: newNoteContent,
            image: newNoteImageFile ? event.target.result : null
        };
        const notes = JSON.parse(localStorage.getItem(`notes_${currentSubject}`)) || [];
        notes.push(newNote);
        localStorage.setItem(`notes_${currentSubject}`, JSON.stringify(notes));
        document.getElementById('newNoteContent').innerHTML = '';
        document.getElementById('newNoteImage').value = '';
        loadNotes();
    };

    if (newNoteImageFile) {
        reader.readAsDataURL(newNoteImageFile);
    } else {
        reader.onload();
    }
}
// Eliminar un apunte
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem(`notes_${currentSubject}`)) || [];
    notes.splice(index, 1);
    localStorage.setItem(`notes_${currentSubject}`, JSON.stringify(notes));
    loadNotes();
}
// Funciones formato de texto
function formatText(command, value = null) {
    document.execCommand(command, false, value);
}
