//URL = 'https://www.rightmove.co.uk/property-to-rent/find.html?searchType=RENT&locationIdentifier=REGION%5E94019&insId=1&radius=0.25&minPrice=&maxPrice=&minBedrooms=&maxBedrooms=&displayPropertyType=&maxDaysSinceAdded=&sortByPriceDescending=&_includeLetAgreed=on&primaryDisplayPropertyType=&secondaryDisplayPropertyType=&oldDisplayPropertyType=&oldPrimaryDisplayPropertyType=&letType=&letFurnishType=&houseFlatShare='

// Error handling: network changes, IP address blocks, changes in website structure
// Implement rate limiting
// Navigate multiple pages on one
import { launch } from 'puppeteer';
const scrapeSite = async () => {
    //adding Puppeteer library
    console.log("start")
    const browser = await launch()
    //browser new page
    const p = await browser.newPage();
    //set viewpoint of browser page
    await p.setViewport({ width: 1000, height: 500 })
    //launch URL
    await p.goto('https://www.rightmove.co.uk/property-to-rent/find.html?searchType=RENT&locationIdentifier=REGION%5E94019&insId=1&radius=0.25&minPrice=&maxPrice=&minBedrooms=&maxBedrooms=&displayPropertyType=&maxDaysSinceAdded=&sortByPriceDescending=&_includeLetAgreed=on&primaryDisplayPropertyType=&secondaryDisplayPropertyType=&oldDisplayPropertyType=&oldPrimaryDisplayPropertyType=&letType=&letFurnishType=&houseFlatShare=', { waitUntil: 'networkidle0' })
    const mainArea =  await p.$eval('.l-propertySearch-main .l-propertySearch-results .l-searchResults', el => el.innerText);
    await browser.close()
    // console.log("Main area", mainArea)
    return mainArea
}
// Export mainArea data
export default scrapeSite

// Periodic scrapes - daily