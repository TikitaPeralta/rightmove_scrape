//URL = 'https://www.rightmove.co.uk/property-to-rent/find.html?searchType=RENT&locationIdentifier=REGION%5E94019&insId=1&radius=0.25&minPrice=&maxPrice=&minBedrooms=&maxBedrooms=&displayPropertyType=&maxDaysSinceAdded=&sortByPriceDescending=&_includeLetAgreed=on&primaryDisplayPropertyType=&secondaryDisplayPropertyType=&oldDisplayPropertyType=&oldPrimaryDisplayPropertyType=&letType=&letFurnishType=&houseFlatShare='

// Error handling: network changes, IP address blocks, changes in website structure
// Implement rate limiting
// Navigate multiple pages on one


//adding Puppeteer library
import { launch } from 'puppeteer';
launch().then(async browser => {
//browser new page
const p = await browser.newPage();
//set viewpoint of browser page
await p.setViewport({ width: 1000, height: 500 })
//launch URL
await p.goto('https://bstackdemo.com')
//capture screenshot
await p.screenshot({
path: 'browserstack-demo.png'
});
//browser close
await browser.close()
})


// Periodic scrapes - daily