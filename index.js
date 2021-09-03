const puppeteer = require('puppeteer');

const config = require('./config');

const userAgentOptions = config.userAgentOptions;
const URL = config.URL;

(async function main(){

    await require('./auth');

    try {
        const browser = await puppeteer.launch({ headless: false, userDataDir: "./user_data"});
        const page = await browser.newPage();
        await page.setUserAgent( userAgentOptions );
        await page.goto(URL);

    }
    catch(error) { console.error}
})();