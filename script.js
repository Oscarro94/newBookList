const bookForm = document.getElementById('book-form');
const bookInput = document.getElementById('book-input');
const bookList = document.getElementById('book-list');
const clearBtn = document.getElementById('clear');
const bookFilter = document.getElementById('filter');
const bookBtn = bookForm.querySelector('button');
let isEditMode = false;

function displayBooks(){
    const booksFromStorage = getBooksFromStorage();
    booksFromStorage.forEach((book) => addBookToDOM(book));
    checkUI();
}

function addBook(e){
    e.preventDefault();

    const newBook = bookInput.value;

    if(newBook === ''){
        alert('Please add a book');
        return;
    }

    if(isEditMode){
        const bookToEdit = bookList.querySelector('.edit-mode');

        removeBookFromStorage(bookToEdit.textContent);
        bookToEdit.classList.remove('edit-mode');
        bookToEdit.remove();
        isEditMode = false;
    }else{
        if(checkIfBookExists(newBook)){
            alert('That book already exists!');
            return;
        }
    }

    addBookToDOM(newBook);

    addBookToStorage(newBook);
    

    checkUI();

    bookInput.value= '';
}

function addBookToDOM(book){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(book));

    const button = createButton('remove-book btn-link text-red');
    li.appendChild(button);

    bookList.appendChild(li);

}


function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function addBookToStorage(book){
    const booksFromStorage = getBooksFromStorage();

    booksFromStorage.push(book);

    localStorage.setItem('books', JSON.stringify(booksFromStorage));
}

function getBooksFromStorage(){
    let booksFromStorage;

    if(localStorage.getItem('books') === null){
        booksFromStorage = [];
    }else{
        booksFromStorage = JSON.parse(localStorage.getItem('books'));
    }
    return booksFromStorage;
}

function onClickBook(e){
    if(e.target.parentElement.classList.contains('remove-book')){
        removeBook(e.target.parentElement.parentElement);
    }else if(e.target.tagName === 'LI'){
        setBookToEdit(e.target);
    }
}

function checkIfBookExists(book){
    const booksFromStorage = getBooksFromStorage();
    return booksFromStorage.includes(book);
}

function setBookToEdit(book){
    isEditMode = true;

    bookList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

    book.classList.add('edit-mode');
    bookBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Book';
    bookBtn.style.backgroundColor = '#228B22';
    bookInput.value = book.textContent;
}

function removeBook(book){
        if(confirm('Are you sure?')){
            book.remove();

            removeBookFromStorage(book.textContent);

            checkUI();
        }
    }

    function removeBookFromStorage(book){
        let booksFromStorage = getBooksFromStorage();

        booksFromStorage = booksFromStorage.filter((i) => i !== book);

        localStorage.setItem('books', JSON.stringify(booksFromStorage));
    }

function clearBooks(){
    while(bookList.firstChild){
        bookList.removeChild(bookList.firstChild);
    }

    if(confirm('Are you sure?')){


    localStorage.removeItem('books');

    checkUI();
    }
}

function filterBooks(e){
    const books = bookList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    books.forEach((book)=>{
        const bookName = book.firstChild.textContent.toLowerCase();

        if(bookName.indexOf(text) != -1){
            book.style.display = 'flex';
        }else{
            book.style.display = 'none';
        }
    });
}

function checkUI(){
    const books = bookList.querySelectorAll('li');

    if(books.length === 0){
        clearBtn.style.display = 'none';
        bookFilter.style.display='none';
    }else{
        clearBtn.style.display = 'block';
        bookFilter.style.display = 'block';
    }

    bookBtn.innerHTML = '<i class ="fa-solid fa-plus"></i>Add Book';
    bookBtn.style.backgroundColor = '#333';
    isEditMode = false;
}


function init(){
bookForm.addEventListener('submit', addBook);
bookList.addEventListener('click',onClickBook);
clearBtn.addEventListener('click', clearBooks);
bookFilter.addEventListener('input', filterBooks);
document,addEventListener('DOMContentLoaded', displayBooks)

checkUI();
}

init();