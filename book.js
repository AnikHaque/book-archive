// accessing the id of the div where all the books will be showed after searching 
const bookInfo = document.getElementById('book-show');

// Function for search button event handler 
const showBooks = () => {
    const searchItem = document.getElementById('book-search');
    const searchItemText = searchItem.value;

    // clear input 
    searchItem.value = ' ';

    // getting url dynamically 
    const url = `https://openlibrary.org/search.json?q=${searchItemText}`;
    // console.log(url); 
    fetch(url)
    .then(res => res.json())    
    .then(data =>  {
      removeNode(bookInfo)
      showBookDetails(data.docs)
})
}

// showBookDetails function 
const showBookDetails= books => {
  removeNode(bookInfo);

  const totalResult = document.getElementById('book-result');

  // error handle of the input which is not available 
  if(books.length === 0){
      totalResult.innerHTML =  `<h2 class="d-block text-light text-center mb-4 fw-bold">No Result Found</h2>`
      removeNode(bookInfo);
  }
  if(books.length){
      totalResult.innerHTML =  `<h2 class="d-block text-warning text-center mb-4 fw-bold">Total Books Found: ${books.length}</h2>`
  }
  bookInfo.textContent= ' ';
     
  // forEach loop part 
    books.forEach(book => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML=`
    
    <div class="card h-100 border border-dark border-3 rounded">
    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg
    " class="card-img-top w-100 img-fluid  mx-auto" alt="...">
    <div class="card-body">
      <h3 class="card-title text-center fw-bold">${book.title}</h3>
      <p class="card-title text-center text-secondary"><b><u>Author</u></b>: ${book.author_name}</p>
      <p class="card-title text-center text-secondary"><b><u>Publisher:</u></b>: ${book.publisher}</p>
      <p class="card-text text-center  text-secondary"><b><u>First Published</u></b>: Year ${book.first_publish_year}</p>
      <p class="card-text text-center text-secondary"><b><u>Publish Date:</b></u> ${book.publish_date}</p>

    </div>
  </div>
    `;
    bookInfo.appendChild(div);

})
}

// removeNode function 
const removeNode = element => {
  var node = element;
  while (element.hasChildNodes()) {              

      if (node.hasChildNodes()) {                
          node = node.lastChild;                
      }
      else {                                     
          node = node.parentNode;                
          node.removeChild(node.lastChild);      
      }
  }
}