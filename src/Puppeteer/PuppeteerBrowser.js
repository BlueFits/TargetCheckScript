const pupeteer = require('puppeteer');
const chromePaths = require("chrome-paths");
const { asyncBrowserScript } = require("./helper");
const fs = require("fs");
const path = require("path");
const { Document, Packer, Paragraph, ImageRun } = require("docx");
const CustomTable = require("../components/CustomTable");
const LegendTable = require("../components/LegendTable");

module.exports = class PuppeteerBrowser {
    constructor (browser) {
        this.browser = browser;
    }

    static async build() {
        let browser = await pupeteer.launch({
            executablePath: chromePaths.chrome,
			headless: false,
			devtools: false,
			defaultViewport: null,
            "args": ["--fast-start", "--disable-extensions", "--no-sandbox"],
        });
        return new PuppeteerBrowser(browser);
    }

    async generateReport(links) {
        //Make a report folder if it doesnt exist already
        if (!fs.existsSync("./report")) fs.mkdirSync("./report");
        let infoErr = [];
        let sections = [{
            properties: {},
            children: [
                LegendTable(),
            ],
        }];
        //Scrape through browser and take screenshots and get info
        for (let i = 0; i < links.length; i++) {
            const pages = await this.browser.pages();
            const page = pages[0];
            await page.setViewport({ width: 1920, height: 1080});
            await page.goto(links[i], { waitUntil: 'load' });
            let imageName = `${i}-screenshot.png`;

            const siteDetails = await page.evaluate(asyncBrowserScript);
            const screenshot = await page.screenshot({ fullPage: true });
            infoErr.push({ siteDetails, imageName,  screenshot});
        }        
        //Generate doc report markdown
        for (let i = 0; i < infoErr.length; i++) {
            const { title, url, errVals } = infoErr[i].siteDetails;
            const imageInline = new Paragraph({
                children: [
                        new ImageRun({
                        data: infoErr[i].screenshot,
                        transformation: {
                            width: 500,
                            height: 900,
                        },
                    })
                ],
            });
            let section = {
                properties: {},
                children: [
                    CustomTable({ title, url, errVals }),
                    imageInline,
                ],
            };
            sections.push(section);
        }
        //Compile report
        const doc = new Document({ sections });
        // Used to export the file into a .docx file
        const buffer = await Packer.toBuffer(doc);
        fs.writeFileSync("./report/report.docx", buffer);
        //Close pupeteer instance
        this.browser.close();
    };
};

