// Import mainArea data
import scrapeSite from './scrape.js';

Bun.serve({
    port: 8080,
    async fetch(req) {
      const url = new URL(req.url);
      if (url.pathname === "/puppeteerdata") {
        const data = await getProcessedDataPromise();
        console.log('data: ', data)
        const headers = {
            'Access-Control-Allow-Origin': '*', // Allow requests from any origin
            'Access-Control-Allow-Methods': 'GET', // Specify the allowed HTTP methods
            'Access-Control-Allow-Headers': 'Content-Type', // Specify the allowed headers
          };
          return new Response(JSON.stringify(data), {
            headers,
          });
      }
      return new Response("404!");
    },
  });

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
    console.log('processMainArea: ', processedData)
    return processedData;
  }

  
  // scrapeSite()
  // .then(mainArea => {
  //   processedData = processMainArea(mainArea);
  // })
  // .catch(error => {
  //   console.error('Error scraping site:', error);
  // });


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