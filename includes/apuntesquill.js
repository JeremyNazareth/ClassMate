let currentSubject = '';
let quill;
// iniciar Quill
function initQuill() {
    quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'link'],
                [{ list: 'ordered' }, { list: 'bullet' }]
            ]
        }
    });
}
// Abrir editor
function openEditor(subject) {
    currentSubject = subject;
    document.getElementById('editorModalLabel').innerText = `Editor de ${subject}`;
    const notes = JSON.parse(localStorage.getItem(`notes_${subject}`)) || [];
    if (notes.length > 0) {
        quill.root.innerHTML = notes[0].content; // Cargar la primera nota
    } else {
        quill.root.innerHTML = '';
    }
    const editorModal = new bootstrap.Modal(document.getElementById('editorModal'));
    editorModal.show();
}
// Guardar nota
function saveNote() {
    const content = quill.root.innerHTML;
    const notes = JSON.parse(localStorage.getItem(`notes_${currentSubject}`)) || [];
    notes.push({ content, date: new Date().toISOString() });
    localStorage.setItem(`notes_${currentSubject}`, JSON.stringify(notes));
    alert('Apunte guardado con éxito');
}
// Iniciar Quill al cargar la página
document.addEventListener('DOMContentLoaded', initQuill);
