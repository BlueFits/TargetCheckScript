import * as pupeteer from 'puppeteer';
import chromePaths from "chrome-paths";

export default class PuppeteerBrowser {
    constructor (browser, page) {
        this.page = page;
        this.browser = browser;
    }

    static async build() {
        let browser = await pupeteer.launch({
            executablePath: chromePaths.chrome,
			headless: true,
			devtools: false,
			defaultViewport: null,
            "args": ["--fast-start", "--disable-extensions", "--no-sandbox"],
        });
        
        const pages = await browser.pages();
		const page = pages[0];
        await page.setViewport({ width: 1920, height: 1080});
        await page.goto("https://www.bmo.com/main/personal", { waitUntil: 'load' });

        return new PuppeteerBrowser(browser, page);
    }

    async screenshot() {
        await this.page.screenshot({path: 'buddy-screenshot.png', fullPage: true});
        this.browser.close();
    };
};