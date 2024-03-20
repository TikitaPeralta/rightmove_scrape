// Import mainArea data
import scrapeSite from './scrape.js';

let processedData = [];

function processMainArea(mainArea) {
    const listings = mainArea.split('Local call rate');
    const cleanedListings = listings.filter(listing => listing.trim() !== '');
    const listOfLists = cleanedListings.map(listing => listing.trim().split('\\n'));
    const processedData = [];
  
    for (let l = 0; l < listOfLists.length; l++) {
      if (listOfLists[l].length > 2) {
        const address = listOfLists[l][6];
        if (listOfLists[l][3].length > 4) {
          const price = listOfLists[l][3];
          const bathrooms = listOfLists[l][7].length === 1 ? listOfLists[l][7] : listOfLists[l][8];
          processedData.push({ address, bathrooms, price });
        } else {
          const price = listOfLists[l][4];
          const bathrooms = listOfLists[l][7].length === 1 ? listOfLists[l][7] : listOfLists[l][8];
          processedData.push({ address, bathrooms, price });
        }
      }
    }
  
    return processedData;
  }

  
  scrapeSite()
  .then(mainArea => {
    processedData = processMainArea(mainArea);
  })
  .catch(error => {
    console.error('Error scraping site:', error);
  });


export function getProcessedDataPromise() {
  return new Promise((resolve, reject) => {
    scrapeSite()
      .then(mainArea => {
        const processedData = processMainArea(mainArea);
        resolve(processedData);
      })
      .catch(error => {
        reject(error);
      });
  });
}