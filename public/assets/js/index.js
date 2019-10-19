var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function() {
	$.ajax({
        type: "GET",
        url: "/api/notes"
    }).then(res => {
    	return res;
};

// A function for saving a note to the db
var saveNote = function(note) {
	$.ajax({
        type: "POST",
        url: "/api/notes",
        data: {note}
    }).then(res => {
    	if (res) {
    		console.log("Note Saved!");
    	}
};

// A function for deleting a note from the db
var deleteNote = function(title) {
  	$.ajax({
        url: "/api/notes",
        method: 'DELETE',
        data: { title }
    }).then(res => {
    	if (res) {
    		console.log("Note Deleted!");
    	}
    });
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
  	if(activeNote != null) {
  		$noteText.text = activeNote;
  	}
  	else
  		$noteText.text = "";
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
  saveNote(activeNote);
  handleNewNoteView();
  handleRenderSaveBtn();
  renderNoteList();
};

// Delete the clicked note
var handleNoteDelete = function(event) {
  let itemToRemove = document.getElementById(event);
        itemToRemove.parentNode.removeChild(itemToRemove);
  deleteNote(event);
};

// Sets the activeNote and displays it
var handleNoteView = function() {
	let x = $("list-group-item").id;
	$noteTitle.text = getNotes[x].title;
	$noteText.text = getNotes[x].text;
  	activeNote = {title: $noteTitle.text, text: $noteText.text};

};

// Sets the activeNote to an empty object and allows the user to enter a new note
var handleNewNoteView = function() {
  activeNote = {};
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
  if ($noteTitle == '' || $noteText == '') {
  	$saveNoteBtn.hide();
  }
  else
  	$saveNoteBtn.show();
};

// Renders the list of note titles
var renderNoteList = function(notes) {	
  	let notes = getNotes();
  	for (let i = 0; i < notes.length; i++) {
	    let $note = $('<div>')
	    let $title = $('<div>')
	    let $text = $('<div>')
	    let $delBtn = $('<button>')
	    $note.attr('class', 'card')
	    $title.text(notes[i].title);
	    $title.attr('class', 'note-title card-header')
	    $title.attr('id', `title${i}`)
	    $txt.text(notes[i].text)
	    $txt.attr('class', 'note-textarea card-body')
	    $dltBtn.text('Delete')
	    $dltBtn.attr('class', 'delete-note');
	    $dltBtn.attr('id', i)
	    $note.append($title);
	    $note.append($text);
	    $note.append($delBtn);
	    $("#noteList").append($note);
  	}
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
	let notes = getNotes();
	$('#noteList').clear();
	renderNoteList();
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
