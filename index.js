import books from 'google-books-search';



let myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

let query = "";

for(let i = 0; i < myArgs.length; i++){
  query += myArgs[i] + " ";
}

class Book {
  constructor(title, authors, publisher){
    this.title = title;
    this.authors = authors;
    this.publisher = publisher;
    this.next = null;
  }
}

class BookList {
  constructor(){
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(title, authors, publisher){
    let newNode = new Book(title, authors, publisher)
    if(!this.head){ 
      this.head = newNode;
      this.tail = this.head; 
    } else { 
      this.tail.next = newNode; 
      this.tail = newNode; 
    }
    this.length++;
    return this; 
  }
  get(index){
    if(index < 0 || index >= this.length) return null
    let counter = 0;
    let current = this.head;
    while(counter !== index){
      current = current.next;
      counter++;
    }
    return current;
  }
  print(){
    let current = this.head;
    let counter = 1;
    while(counter < 6){
      console.log("Book " + counter + " -----------------");
      console.log("Title: " + current.title);
      console.log("Authors: " + current.authors);
      console.log("Publisher: " + current.publisher);
      console.log(" ");
      current = current.next;
      counter++;
    }
  }
}

let querySearchResults = new BookList();
let readingList = new BookList();

books.search(query, function(error, results) {
  if ( ! error ) {
      for(let i = 0; i < 5; i++){
          querySearchResults.push(results[i].title, results[i].authors, results[i].publisher)
      }
      querySearchResults.print();
  } else {
      console.log(error);
  }
});