const pupeteer = require('puppeteer');
const chromePaths = require("chrome-paths");
const { asyncBrowserScript } = require("./helper");
const fs = require("fs");
const path = require("path");
const { TemplateHandler } = require("easy-template-x");

module.exports = class PuppeteerBrowser {
    constructor (browser) {
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
        return new PuppeteerBrowser(browser);
    }

    async generateReport(links) {
        if (!fs.existsSync("./report")){
            fs.mkdirSync("./report");
        }

        let infoErr = [];

        for (let i = 0; i < links.length; i++) {
            const pages = await this.browser.pages();
            const page = pages[0];
            await page.setViewport({ width: 1920, height: 1080});
            await page.goto(links[i], { waitUntil: 'load' });
            let imageName = `${i}-screenshot.png`;

            const siteDetails = await page.evaluate(asyncBrowserScript);
            await page.screenshot({path: `./report/${imageName}`, fullPage: true});
            infoErr.push({ siteDetails,  imageName });
        }

        const templateFile = fs.readFileSync(path.join(__dirname, '..', 'templates', 'template.docx'));

        const data = {
            report: infoErr.map((val) => {
                const { title, url, errVals } = val.siteDetails;
                return {
                    title,
                    url,
                    value: errVals.join(", \n"),
                };
            }),
            "image_screenshot": {
                _type: "image",
                source: fs.readFileSync(path.join(__dirname, '..', '..', 'report', infoErr[0].imageName)),
                format: "image/png",
                width: 400,
                height: 700,
            }
        };
    
        const handler = new TemplateHandler();
        const doc = await handler.process(templateFile, data);
        fs.writeFileSync('./report/myTemplate - output.docx', doc);
        this.browser.close();
    };
};

