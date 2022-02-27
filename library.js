const container = document.getElementById("container");
const Library = [];

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
}

addBookToLibrary("Harry Potter", "JKR", "200", "Completed");
addBookToLibrary("Hobbits", "Madeline", "300", "Reading");

const newButton = document.getElementById("new");
newButton.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const status = document.getElementById("status").value;

  addBookToLibrary(title, author, pages, status);
});
