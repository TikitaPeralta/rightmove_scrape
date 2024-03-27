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

  async function processMainArea() {
    try {
      // Read the contents of info.json
      const infoJson = await Bun.file('info.json').text();
      const data = JSON.parse(infoJson);
  
      // Filter the data based on some criteria
      const filteredData = data.filter(item => {
        // Example criteria: Keep items where 'value' is greater than 10
        return item.value > 10;
      });
  
      // Create a new Blob from the filtered data
      const filteredDataBlob = new Blob([JSON.stringify(filteredData)], { type: 'application/json' });
  
      // Write the filtered data to a new file
      await Bun.write('filtered_data.json', filteredDataBlob);
  
      console.log('Data processing completed successfully.');
      return true
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }


async function createFile(results) {
    const jsonData = JSON.stringify(results);
    const blob = new Blob([jsonData], { type: 'application/json' });
    await Bun.write("info.json", blob);
  }

export async function getProcessedDataPromise() {
  try {
    const mainArea = await scrapeSite();
    console.log('straight from scrapeSite', mainArea);

    createFile();
    console.log('written first json')
    processMainArea();
    console.log('filtered data json written')

    const newJson = await Bun.file('filtered_data.json').text();
    const data = JSON.parse(newJson);

    return data;
  } catch (error) {
    throw error;
  }
}