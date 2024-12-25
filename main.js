document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById("bookForm");
    const bookFormTitle = document.getElementById("bookFormTitle");
    const bookFormAuthor = document.getElementById("bookFormAuthor");
    const bookFormYear = document.getElementById("bookFormYear");
    const bookFormIsComplete = document.getElementById("bookFormIsComplete");
    const incompleteBookList = document.getElementById("incompleteBookList");
    const completeBookList = document.getElementById("completeBookList");
  
    const STORAGE_KEY = "bookshelf";
    let books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  
    bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      addBook();
    });
  
    function addBook() {
      const title = bookFormTitle.value.trim();
      const author = bookFormAuthor.value.trim();
      const year = bookFormYear.value.trim();
      const isComplete = bookFormIsComplete.checked;
  
      if (title === "" || author === "" || year === "") return;
  
      const newBook = {
        id: +new Date(),
        title,
        author,
        year,
        isComplete,
      };
  
      books.push(newBook);
      saveBooks();
      renderBooks();
      bookForm.reset();
    }
  
    function saveBooks() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
  
    function renderBooks() {
      incompleteBookList.innerHTML = "";
      completeBookList.innerHTML = "";
  
      books.forEach((book) => {
        const bookElement = createBookElement(book);
  
        if (book.isComplete) {
          completeBookList.appendChild(bookElement);
        } else {
          incompleteBookList.appendChild(bookElement);
        }
      });
    }
  
    function createBookElement(book) {
      const bookContainer = document.createElement("div");
      bookContainer.dataset.bookid = book.id;
      bookContainer.dataset.testid = "bookItem";
  
      const titleElement = document.createElement("h3");
      titleElement.dataset.testid = "bookItemTitle";
      titleElement.textContent = book.title;
  
      const authorElement = document.createElement("p");
      authorElement.dataset.testid = "bookItemAuthor";
      authorElement.textContent = `Penulis: ${book.author}`;
  
      const yearElement = document.createElement("p");
      yearElement.dataset.testid = "bookItemYear";
      yearElement.textContent = `Tahun: ${book.year}`;
  
      const actionContainer = document.createElement("div");
  
      const toggleButton = document.createElement("button");
      toggleButton.dataset.testid = "bookItemIsCompleteButton";
      toggleButton.textContent = book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca";
      toggleButton.addEventListener("click", () => toggleBookCompletion(book.id));
  
      const deleteButton = document.createElement("button");
      deleteButton.dataset.testid = "bookItemDeleteButton";
      deleteButton.textContent = "Hapus Buku";
      deleteButton.addEventListener("click", () => deleteBook(book.id));
  
      const editButton = document.createElement("button");
      editButton.dataset.testid = "bookItemEditButton";
      editButton.textContent = "Edit Buku";
      editButton.addEventListener("click", () => editBook(book));
  
      actionContainer.append(toggleButton, deleteButton, editButton);
      bookContainer.append(titleElement, authorElement, yearElement, actionContainer);
  
      return bookContainer;
    }
  
    function toggleBookCompletion(bookId) {
      const book = books.find((b) => b.id === bookId);
      if (book) {
        book.isComplete = !book.isComplete;
        saveBooks();
        renderBooks();
      }
    }
  
    function deleteBook(bookId) {
      books = books.filter((b) => b.id !== bookId);
      saveBooks();
      renderBooks();
    }
  
    function editBook(book) {
      bookFormTitle.value = book.title;
      bookFormAuthor.value = book.author;
      bookFormYear.value = book.year;
      bookFormIsComplete.checked = book.isComplete;
  
      deleteBook(book.id);
    }
  
    function searchBooks() {
      const searchQuery = searchInput.value.trim().toLowerCase();
  
      incompleteBookList.innerHTML = "";
      completeBookList.innerHTML = "";
  
      books
        .filter((book) => book.title.toLowerCase().includes(searchQuery))
        .forEach((book) => {
          const bookElement = createBookElement(book);
  
          if (book.isComplete) {
            completeBookList.appendChild(bookElement);
          } else {
            incompleteBookList.appendChild(bookElement);
          }
        });
    }
  
    renderBooks();
  });
  