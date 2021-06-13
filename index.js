import books from 'google-books-search';
import inquirer from 'inquirer';

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

'use strict';
console.log('Hello, search books via Google and add them to a Reading List.');

const question1 = [
  {
    type: 'input',
    name: 'bookSearch',
    message: 'Search book: ',
  },
];
const question2 = [
  {
    type: 'list',
    name: 'chooseBook',
    message: 'Which book do you want to add to your reading list? Enter the number: ',
    choices: [1,2,3,4,5]
  }
];
const question3 = [
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Hit enter to search again.',
  }
];

function ask() {
  inquirer
  .prompt(
    question1
  )
  .then((answer1) => {
    bookQuery(answer1.bookSearch);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error.isTtyError)
      // Prompt couldn't be rendered in the current environment
    } else {
      querySearchResults.print();
    }
  });
}  

// function selectBook() {
//   inquirer
//   .prompt(question2)
//   .then((answer2) => {
//     let selection = querySearchResults.get(answer2)
//     console.log(selection);
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       console.log(error.isTtyError)
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       console.log("Good!");
//     }
//   });
// }


ask();