const puppeteer = require('puppeteer');

const config = require('./config');

const userAgentOptions = config.userAgentOptions;
const URL = config.URL;

(async function auth_check(){
    // Configures puppeteer
    const browser = await puppeteer.launch({ headless: true,   userDataDir: "./user_data"});
    const page = await browser.newPage();
    await page.setUserAgent( userAgentOptions );
    await page.goto(URL);

    try {
        await page.waitForSelector('._1lPgH');
    } catch (e) {
        if (e instanceof puppeteer.errors.TimeoutError) {
            // Do something if this is a timeout.
            await browser.close();
            return auth_user(browser);
        }
    }
})();

const auth_user = async (browser_instance) => {
    await browser_instance.close();
    const browser = await puppeteer.launch({ headless: false, userDataDir: "./user_data"});
    const page = await browser.newPage();
    await page.setUserAgent( userAgentOptions );
    await page.goto(URL);

    try {
        await page.waitForSelector('._1lPgH');
    } catch (e) {
        if (e instanceof puppeteer.errors.TimeoutError) {
            await browser.close();
        }
    }

    browser.close();
}