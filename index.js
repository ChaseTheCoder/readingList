import books from 'google-books-search';

let myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

let query = "";

for(let i = 0; i < myArgs.length; i++){
  query += myArgs[i] + " ";
}

books.search(query, function(error, results) {
  if ( ! error ) {
      console.log(results);
  } else {
      console.log(error);
  }
});