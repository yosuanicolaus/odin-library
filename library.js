const container = document.getElementById("container");
const newButton = document.getElementById("new");
const warning = document.getElementById("warning");

const form = document.querySelector("form");
const formTitle = document.getElementById("title");
const formAuthor = document.getElementById("author");
const formPages = document.getElementById("pages");
const formStatus = document.getElementById("status");

const Library = [];

let editIndex = -1;
let editFocus = false;

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  Library.push(newBook);

  const card = container.insertRow();
  card.className = "card";
  for (const key in newBook) {
    const cell = card.insertCell();
    cell.textContent = newBook[key];
  }

  let edit = card.insertCell();
  let button = document.createElement("button");
  button.textContent = "edit";
  edit.appendChild(button);

  editIndex++;
  button.className = "edit-" + editIndex;
  button.addEventListener("click", () => {
    if (editFocus) {
      editFocus = false;
      card.style.filter = "brightness(100%)";
      card.style.border = "none";
      form.reset();
      return;
    }

    editFocus = true;
    //darken the library with that index
    card.style.filter = "brightness(80%)";
    card.style.border = "solid blue";

    //fill the form and grab focus there
    const currentIndex = button.className.slice(5);
    formTitle.value = Library[currentIndex].title;
    formAuthor.value = Library[currentIndex].author;
    formPages.value = Library[currentIndex].pages;
    formStatus.value = Library[currentIndex].status;

    //rewrite the library with the data
  });
}

newButton.addEventListener("click", () => {
  const title = formTitle.value;
  let author = formAuthor.value;
  let pages = formPages.value;
  const status = formStatus.value;

  if (title.length == 0) {
    warning.style.display = "block";
    return;
  }
  warning.style.display = "none";

  if (author.length == 0) author = "-";
  if (pages.length == 0) pages = "-";

  addBookToLibrary(title, author, pages, status);
  form.reset();
});

// sample book
addBookToLibrary("Harry Potter", "JKR", "200", "Completed");
addBookToLibrary("Hobbits", "Madeline", "300", "Reading");
