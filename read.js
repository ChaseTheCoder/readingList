import books from 'google-books-search';
import readline from 'readline';

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
    if(index < 1 || index >= this.length) return null;
    let counter = 1;
    let current = this.head;
    while(counter !== index){
      current = current.next;
      counter++;
    }
    console.log(current);
    return current;
  }
  print(){
    let current = this.head;
    let counter = 1;
    while(counter < 6){
      console.log('Book ' + counter + ' -----------------');
      console.log('Title: ' + current.title);
      console.log('Authors: ' + current.authors);
      console.log('Publisher: ' + current.publisher);
      console.log(' ');
      current = current.next;
      counter++;
    }
  }
}

let querySearchResults = new BookList();
let readingList = new BookList();

function bookQuery(query) {
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
}

console.log('       ')
console.log('       ')
console.log('Hello, search books via Google and add them to a Reading List.');
console.log('       ')
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(questionText) {
  return new Promise((resolve, reject) => {
  readlineInterface.question(questionText, (input) => resolve(input) );
});
}

async function start() {
  let queryKeyWords = await ask('Search Books: ')
  bookQuery(queryKeyWords) //need to make synchornous
  let num = await ask('number 1-5: ')
  querySearchResults.get(num)
  console.log('Done')
  process.exit() 
}

start();