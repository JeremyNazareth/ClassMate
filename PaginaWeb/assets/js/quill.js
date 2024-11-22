const quills = [];
const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline'], // Estilos básicos
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Listas
            [{ 'color': [] }, { 'background': [] }], // Colores
            ['image'] // Botón para insertar imágenes
          ],
    }
});

let isEditing = false
function openEditor(){
    document.getElementById('modal').style.display = 'block';
    console.log('whats');
    let title = document.getElementById('title');
    title.value  = '';
    isEditing = false;
    quill.setContents([]);
}

function closeEditor(){
    document.getElementById('modal').style.display = 'none';
}

function createNote(){
    const title = document.getElementById('title').value;
    const delta = quill.getContents();
    const note = {
        title: title,
        content: delta
    };
    quills.push(note);
    document.getElementById('modal').style.display = 'none';
    showNotes();
}

function saveNote(index){
    let contentDiv = document.getElementById('editor');
    let titleDiv = document.getElementById('title');

    selectedNote = quills[index];
    console.log(selectedNote);
    selectedNote.title = titleDiv.value;
    selectedNote.content = quill.getContents();
    showNotes();
    closeEditor();
}
function removeNote(index){
    quills.splice(index,1);
    showNotes();
}
function showNotes(){
    const notesContainer= document.getElementById('notesContainer');
    notesContainer.innerHTML = '';
    quills.forEach((note, index) =>{
        const noteDiv = document.createElement('div');
        noteDiv.innerHTML=`
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    ${note.title}
                </div>
                <div class="justify-content-center">
                    <button class="btn btn-primary" onclick="editNote(${index})">
                        <span class="material-icons">
                            edit_note
                        </span>
                    </button>
                    <button class="btn btn-primary" onclick="showNote(${index})">
                        <span class="material-icons">
                            visibility
                        </span>
                    </button>
                    <button class="btn btn-danger" onclick="removeNote(${index})">
                        <span class="material-icons">
                            delete
                        </span>
                    </button>
                </div>
            </li>
        `
        notesContainer.appendChild(noteDiv);
    });
    
}

function showNote(index){
    document.getElementById('modalNote').style.display = 'block';
    let showDiv = document.getElementById('note-content');
    let titleDiv = document.getElementById('showTitle');
    titleDiv.innerHTML = '';
    showDiv.innerHTML = '';
    showDiv.className = 'note-content';
    const selectedNote = quills[index];
    const quill = new Quill(document.createElement("div"));
    quill.setContents(selectedNote.content);
    const content = document.createElement("div");
    content.innerHTML = quill.root.innerHTML;
    showDiv.appendChild(content);
    titleDiv.textContent = `${selectedNote.title}`;
}

function closeNoteModal(){
    document.getElementById('modalNote').style.display = 'none';
}

function editNote(index){
    isEditing = true;
    document.getElementById('modal').style.display = 'block';
    let contentDiv = document.getElementById('editor');
    let saveBtn = document.getElementById('saveBtn');
    let titleDiv = document.getElementById('title');
    
    saveBtn.setAttribute('onclick',`saveNote(${index})`)
    const selectedNote = quills[index];
    quill.setContents([]);
    quill.setContents(selectedNote.content);
    console.log(title);
    titleDiv.value = '';
    titleDiv.value = `${selectedNote.title}`;
}

