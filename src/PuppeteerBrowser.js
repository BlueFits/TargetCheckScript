import * as pupeteer from 'puppeteer';
import chromePaths from "chrome-paths";

export default class PuppeteerBrowser {
    constructor (page) {
        this.page = page;
    }

    static async build() {
        let browser = await pupeteer.launch({
            executablePath: chromePaths.chrome,
			headless: false,
			devtools: false,
			defaultViewport: null,
        });
        
        const pages = await browser.pages();
		const page = pages[0];
        await page.goto("https://www.google.com/", { waitUntil: 'load' });

        return new PuppeteerBrowser(page);
    }
};