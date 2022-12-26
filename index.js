let library = [];

// class template for the book
function Book (title, author, pages, read,index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index

    this.info = function () {
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${read}.`);
    }
}


function addBookToLibrary (title, author, pages, read,index) {
    library.push(new Book(title, author, pages, read,index));
}

// display a new book on the page
function addBookToPage(title, author, page, read,index) {
    let div = document.createElement("div");
            div.setAttribute("class", "bookItem");
            div.setAttribute("data-index",index);

            let titleP = document.createElement("p");
            titleP.setAttribute("class","title");
            titleP.textContent = "Title:   "+title;
            div.appendChild(titleP);

            let authorP = document.createElement("p");
            authorP.setAttribute("class","author");
            authorP.textContent = "Author:   "+author;
            div.appendChild(authorP);

            let pagesP = document.createElement("p");
            pagesP.setAttribute("class","pages");
            pagesP.textContent = "Number of pages:   "+page;
            div.appendChild(pagesP);

            let readP = document.createElement("p");
            readP.setAttribute("class","read");
            readP.textContent = "Read?:   "+read;
            div.appendChild(readP);
            
            let deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("class","delete-button");
            deleteBtn.textContent = "Remove";

            let changeReadStatus = document.createElement("button");
            changeReadStatus.setAttribute("class","change-read-button");
            changeReadStatus.textContent = "Change Read";

            let deleteBtnContainer = document.createElement("div");
            deleteBtnContainer.setAttribute("class", "delete-button-container");
            deleteBtnContainer.appendChild(deleteBtn);
            deleteBtnContainer.appendChild(changeReadStatus);
            div.appendChild(deleteBtnContainer);
        


            let parent = document.querySelector(".books-section");
            div.style.border = "2px solid grey";
            div.style.margin = "10px";
            div.style.width = "200px";
            div.style.height = "250px";
            div.style.padding = "15px 15px 0px 15px";

            parent.appendChild(div);
}

// displays each book on its own card
function displayLibrary () {
    library.forEach(
        function (item, index) {
            let book = item;
            addBookToPage(item.title, item.author, item.pages, item.read, index);
            
        }
    );
}


// change submit behaviour of form submit button
let addBookForm = document.querySelector('[class="new-book-form"]');
addBookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;

    let index = library.length;
    addBookToLibrary(title, author, pages, read,index);
    addBookToPage(title, author, pages, read,index);
    console.log(library);

    document.getElementById("bookForm").style.display = "None";

});



// displays the form
function openForm() {
    let form = document.getElementById("bookForm");
    if(form.style.display === "block") {
        form.style.display = "None";
    }else {
        form.style.display = "block";
    }
}

library.push(new Book("The Hobbit", "J.R.R Tolkien", 259, "no",0));
library.push(new Book("Percy Jackson and the lightning thief", "Rick Riordan", 500, "yes",1));

console.log(library);
displayLibrary();

// using event delegation to add the functionality for when both the delete and change read status buttons
document.addEventListener("click", function(e) {
        // const target = e.target.closest(".delete-button");
        const target = e.target;
        if(target.matches(".delete-button")) {
            let index = target.parentElement.parentElement.getAttribute("data-index");
            library = library.splice(index,1);
            target.closest('div.bookItem').remove();
            reOrderLibraryIndex();
        }else if(target.matches(".change-read-button")) {

            let dataIndex = target.closest(".bookItem");
            console.log(dataIndex.getAttribute("data-index"));
            let book = library[dataIndex.getAttribute("data-index")];
            console.log(book);
            if(book.read === "yes"){
                book.read = "no";
            }else {
                book.read = "yes";
            };

            resetGrid();
        }
        
});

// resets the books-section, deletes all books on page and re-displays them from the library array.
function resetGrid (){
    let parent = document.querySelector(".books-section");
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    };

    displayLibrary();
}




// when a book is deleted, the data-index values of the books left on the screen have to be updated
function reOrderLibraryIndex() {

    // reset library indexes
    for(let i = 0; i<library.length; i++){
        library[i].index = i;
    };

    // reset books on the page
    let books = document.getElementsByClassName("bookItem");
    for(let j=0; j<books.length;j++){
        books[j]["data-index"] = j;
    };

    console.log(books);
}



