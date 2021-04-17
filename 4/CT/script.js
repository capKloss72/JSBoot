
// Create list item
function generateNoteListItem(noteName) {

  var list = document.getElementById('list');
  var newLi = document.createElement('li');
  var newP = document.createElement('p');
  var newPI = document.createElement('p');
  var newIPencil = document.createElement('i');
  var newITimes = document.createElement('i');
  var newInput = document.createElement('input');

  newLi.appendChild(newP);
  newLi.appendChild(newPI);
  newPI.appendChild(newIPencil);
  newPI.appendChild(newITimes);
  newLi.appendChild(newInput);

  newP.innerHTML = noteName;
  newIPencil.setAttribute('class', 'fa fa-pencil-square-o');
  newITimes.setAttribute('class', 'fa fa-times');
  newInput.setAttribute('class', 'edit-node');
  newInput.setAttribute('type', 'text');

	list.appendChild(newLi);

  cleanupAddNoteInput();
}

function cleanupAddNoteInput() {
  if (input.value != null && (input.value).trim().length > 0) {
    input.value = '';
  }
}

var btn = document.getElementById('add-btn');
var input = document.getElementById('add-input');
  
btn.addEventListener('click', function(e) {
	e.preventDefault();
	var newNote = input.value.trim();
  if (newNote != null && newNote.length > 0) {
		generateNoteListItem(input.value);
	}
})









