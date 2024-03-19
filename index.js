// Import mainArea data
import scrapeSite from './scrape.js';

scrapeSite()
  .then(mainArea => {
    // console.log(mainArea);
    const listings = mainArea.split('Local call rate');
    // Remove empty items from the list
    const cleanedListings = listings.filter(listing => listing.trim() !== '');
    // Split each listing by newline to create a list of lists
    const listOfLists = cleanedListings.map(listing => listing.trim().split('\n'));
    for(let l = 0; l < listOfLists.length; l++){
        // console.log(listOfLists[l].length)
        if(listOfLists[l].length > 2){
            const address = listOfLists[l][6]
            // listOfLists[l][0]
            if(listOfLists[l][3].length > 4){
                const price = listOfLists[l][3]
                if(listOfLists[l][7].length == 1){
                    const bathrooms = listOfLists[l][7]
                    console.log('address: ', address, ' | bathrooms: ', bathrooms, ' | price: ', price)
                } else {
                    const bathrooms = listOfLists[l][8]
                    console.log('address: ', address, ' | bathrooms: ', bathrooms, ' | price: ', price)
                }
            } else {
                const price = listOfLists[l][4]
                if(listOfLists[l][7].length == 1){
                    const bathrooms = listOfLists[l][7]
                    console.log('address: ', address, ' | bathrooms: ', bathrooms, ' | price: ', price)
                } else {
                    const bathrooms = listOfLists[l][8]
                    console.log('address: ', address, ' | bathrooms: ', bathrooms, ' | price: ', price)
                }
            }
            // console.log(listOfLists[l]);
        } 
    }
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