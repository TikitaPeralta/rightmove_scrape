// Import mainArea data
import scrapeSite from './scrape.js';
// console.log(scrapeSite);
// const scrapeSite = require('./scrape.js');
// const fs = require('fs');

scrapeSite()
  .then(mainArea => {
    console.log(mainArea);
    // Requiring fs module in which
    // writeFile function is defined.
    Bun.write('output.txt', mainArea)
  })
  .catch(error => {
    console.error('Error scraping site:', error);
  });


// console.log(mainArea)
// const l = mainArea.split('+');
// console.log(l)
// Address, no. of bathrooms, price
// for(let main = 0; main < mainArea.length; main++) {
//     console.log(mainArea[main])
// }
//browser close
// const data = {
//     'address' : $`{}`,
//     'bathrooms' : $`{}`,
//     'price' : $`{}`
//     };