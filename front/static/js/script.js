// Fetch notes from the server
const getNotes = async () => {
    try {
        const response = await fetch("__API_URL__/api/notes");
        const data = await response.json();
        if (response.status !== 500) {
            populateNotes(data);
        } else {
            showAlert(data.error);
        }
    } catch (error) {
        console.error(`Error fetching notes: ${error}`);
        showAlert(error);
    }
};

// Create a new note
const createNote = async () => {
    const note = document.getElementById("new-note").value.trim();
    if (!note) {
        showAlert("La note ne peut pas etre vide");
    }
    const payload = { note };
    try {
        const response = await fetch("__API_URL__/api/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (response.status !== 500) {
            getNotes();
            note.innerHTML = "";
        } else {
            showAlert(data.error);
        }
    } catch (error) {
        console.error(`Error creating a note: ${error}`);
        showAlert(error);
    }
};

// Delete a note
const deleteNote = async id => {
    try {
        const response = await fetch(`__API_URL__/api/notes/${id}`, { method: "DELETE" });
        const data = await response.json();
        if (response.status !== 500) {
            getNotes();
        } else {
            showAlert(data.error);
        }
    } catch (error) {
        console.error(`Error deleting a note: ${error}`);
        showAlert(error);
    }
};

// Population the UI with fetched notes
const populateNotes = data => {
    const noteList = document.getElementById("note-list");
    noteList.innerHTML = "";
    data.notes.forEach(note => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note-card";
        noteDiv.textContent = note.note;
        const noteClose = document.createElement("div");
        noteClose.className = "remove";
        noteClose.textContent = "✖";
        noteClose.addEventListener("click", () => deleteNote(note._id));
        noteDiv.appendChild(noteClose);
        noteList.appendChild(noteDiv);
    });
};

// Display an alert card
const showAlert = data => {
    const alertContainer = document.getElementById("alert");
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert";
    alertDiv.innerHTML = data;
    alertDiv.addEventListener("click", () => alertDiv.remove());
    alertContainer.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
};

// When the UI starts
document.addEventListener("DOMContentLoaded", () => {
    getNotes();
    document.getElementById("add-note-btn").addEventListener("click", createNote);
})
