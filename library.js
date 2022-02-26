const Library = [];

function Book(title, author, pages, progress) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.progress = progress;
}

function addBookToLibrary(title, author, pages, progress) {
  Library.push(new Book(title, author, pages, progress));
}

addBookToLibrary("Harry Potter", "JKR", "200", "45");
addBookToLibrary("Hobbits", "Madeline", "300", "95");

console.table(Library);
