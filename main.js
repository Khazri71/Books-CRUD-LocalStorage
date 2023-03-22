/*Variables*/
let theAllButtonsControl = document.querySelectorAll(
  "main .books-notes .part-1 .buttons-control button"
);
(theInput = document.querySelector(
  "main .books-notes .part-1 .enter-book-info input"
)),
  (theResultMessage = document.querySelector(
    "main .books-notes .part-2 .result-message p"
  )),
  (theResultBlock = document.querySelector(
    "main .books-notes .part-2 .result-message"
  )),
  (theAllBooks = document.querySelector("main .books-notes .part-2 .books")),
  (theBook = document.querySelector("main .books-notes .part-2 .books .book")),
  (theButtonShowAll = document.querySelector(
    "main .books-notes .part-2 button:first-child "
  )),
  (theNotes = document.querySelector(
    "main .books-notes .part-1 .enter-book-info div textarea"
  )),
  (arrAllBooks = [...theAllBooks.children]);

function controlActions() {
  theAllButtonsControl.forEach((btnControl) => {
    btnControl.addEventListener("click", (e) => {
      if (e.target.classList.contains("search")) {
        searchExistBook();
        makeInputEmpty();
      } else if (e.target.classList.contains("add")) {
        addBook();
        makeInputEmpty();
      } else if (e.target.classList.contains("delete")) {
        deleteBook();
        makeInputEmpty();
      }
    });
  });
}
controlActions();

function showAllAction() {
  theButtonShowAll.addEventListener("click", () => {
    showAllBooks();
    theAllBooks.style.display = "block";
    // theButtonShowAll.setAttribute("disabled", "");
    theResultBlock.style.display = "none";
  });
}
showAllAction();

function makeInputEmpty() {
  theInput.value = "";
  theNotes.value = "";
}

function EmptyInputMessage() {
  theResultMessage.innerHTML = "Book Name and Notes Can't Be Empty!";
}

function addBook() {
  theResultBlock.style.display = "block";
  theAllBooks.style.display = "none";
  theButtonShowAll.removeAttribute("disabled");
  if (theInput.value !== "") {
    if (localStorage.getItem(theInput.value)) {
      theResultMessage.innerHTML = `The Book With Name <span> ${theInput.value} </span> Is Aready Exist`;
    } else {
      //Add A Book To LocalStorage
      localStorage.setItem(theInput.value, "Book Name");
      theResultMessage.innerHTML = `Book <span>${theInput.value} </span> Added Successfully`;
    }
  } else {
    EmptyInputMessage();
  }
}

function deleteBook() {
  theResultBlock.style.display = "block";
  theAllBooks.style.display = "none";
  theButtonShowAll.removeAttribute("disabled");
  if (theInput.value !== "") {
    if (localStorage.getItem(theInput.value)) {
      //Delete A Book From LocalStorage
      localStorage.removeItem(theInput.value);
      theResultMessage.innerHTML = `Book <span>${theInput.value} </span> Deleted Successfully`;
    } else {
      theResultMessage.innerHTML = `The Book With Name <span> ${theInput.value}</span> Not Exist`;
    }
  } else {
    EmptyInputMessage();
  }
}

function searchExistBook() {
  theResultBlock.style.display = "block";
  theAllBooks.style.display = "none";
  theButtonShowAll.removeAttribute("disabled");
  if (theInput.value !== "") {
    if (localStorage.getItem(theInput.value)) {
      theResultMessage.innerHTML = `The Book With Name <span> ${theInput.value}</span> Found`;
    } else {
      theResultMessage.innerHTML = `The Book With Name <span> ${theInput.value}</span> Not Found`;
    }
  } else {
    EmptyInputMessage();
  }
}

function showAllBooks() {
  theAllBooks.innerHTML = "";
  if (localStorage.length != 0) {
    for (let [key, value] of Object.entries(localStorage)) {
      theAllBooks.innerHTML += `
    <div class="book">
      <h2>${key}</h2>
      <p>
       Lorem Ipsum Lorem Ipsum Lorem Ipsum
      </p>
    </div> <br/>`;
    }
  }
  if (localStorage.length == 0) {
    theAllBooks.innerHTML = `
    <div class="book">
      <p>
      No Books To Show!
      </p>
    </div> <br/>`;
  }
}
